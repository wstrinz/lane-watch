[CmdletBinding()]
param([string]$TaskName = "Lane Watch Agent Observer")

$ErrorActionPreference = "Stop"
$task = Get-ScheduledTask -TaskName $TaskName
if ($task.State -eq "Running") {
    Stop-ScheduledTask -TaskName $TaskName
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        if ((Get-ScheduledTask -TaskName $TaskName).State -ne "Running") { break }
        Start-Sleep -Milliseconds 250
    }
}
Start-ScheduledTask -TaskName $TaskName
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    $task = Get-ScheduledTask -TaskName $TaskName
    if ($task.State -eq "Running") { break }
    Start-Sleep -Milliseconds 250
}
[pscustomobject]@{ TaskName = $task.TaskName; State = $task.State }
