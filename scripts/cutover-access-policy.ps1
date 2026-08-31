[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][int]$OldSupervisorPid,
    [Parameter(Mandatory = $true)][int]$OldBunPid,
    [string]$TaskName = "Lane Watch Agent Observer"
)

$ErrorActionPreference = "Stop"
$supervisor = Get-CimInstance Win32_Process -Filter "ProcessId=$OldSupervisorPid"
$bun = Get-CimInstance Win32_Process -Filter "ProcessId=$OldBunPid"
if (-not $supervisor -or $supervisor.Name -ne "powershell.exe" -or $supervisor.CommandLine -notlike "*agent-observer\run.ps1*" -or $supervisor.CommandLine -notlike "*-AllowedTailscaleUsers*") {
    throw "PID $OldSupervisorPid is not the expected legacy Lane Watch supervisor"
}
if (-not $bun -or $bun.Name -ne "bun.exe" -or $bun.ParentProcessId -ne $OldSupervisorPid -or $bun.CommandLine -notlike "*src/server.ts*") {
    throw "PID $OldBunPid is not the expected Lane Watch Bun child of PID $OldSupervisorPid"
}

Stop-Process -Id $OldBunPid
Stop-Process -Id $OldSupervisorPid
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    if ((Get-ScheduledTask -TaskName $TaskName).State -ne "Running") { break }
    Start-Sleep -Milliseconds 250
}
Start-ScheduledTask -TaskName $TaskName
[pscustomobject]@{ TaskName = $TaskName; State = (Get-ScheduledTask -TaskName $TaskName).State; StoppedSupervisor = $OldSupervisorPid; StoppedBun = $OldBunPid }
