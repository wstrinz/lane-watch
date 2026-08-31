[CmdletBinding()]
param(
    [string]$TaskName = "Lane Watch Agent Observer",
    [int]$Port = 4317,
    [string]$AllowedTailscaleUsers,
    [string]$MacHost = "macbook"
)

$ErrorActionPreference = "Stop"
if ([string]::IsNullOrWhiteSpace($AllowedTailscaleUsers)) {
    throw "-AllowedTailscaleUsers is required for a tailnet deployment"
}

$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$runScript = Join-Path $appRoot "run.ps1"
$windowsRoot = [Environment]::GetFolderPath("Windows")
$powershell = Join-Path $windowsRoot "System32\WindowsPowerShell\v1.0\powershell.exe"
if (-not (Test-Path -LiteralPath $powershell -PathType Leaf)) {
    throw "Windows PowerShell executable not found at $powershell"
}
$account = [Security.Principal.WindowsIdentity]::GetCurrent().Name
$arguments = @(
    "-NoProfile"
    "-NonInteractive"
    "-ExecutionPolicy", "Bypass"
    "-File", ('"' + $runScript + '"')
    "-Port", [string]$Port
    "-AllowedTailscaleUsers", ('"' + $AllowedTailscaleUsers + '"')
    "-MacHost", ('"' + $MacHost + '"')
) -join " "

$action = New-ScheduledTaskAction -Execute $powershell -Argument $arguments -WorkingDirectory $appRoot
$triggers = @(
    New-ScheduledTaskTrigger -AtStartup
    New-ScheduledTaskTrigger -AtLogOn -User $account
)
$principal = New-ScheduledTaskPrincipal -UserId $account -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit ([TimeSpan]::Zero) `
    -MultipleInstances IgnoreNew `
    -RestartCount 999 `
    -RestartInterval ([TimeSpan]::FromMinutes(1))

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $triggers `
    -Principal $principal -Settings $settings -Description "Tailnet-only Claude research lane monitor with startup watchdog" -Force | Out-Null
Start-ScheduledTask -TaskName $TaskName
Write-Output "REGISTERED task=$TaskName account=$account port=$Port"
