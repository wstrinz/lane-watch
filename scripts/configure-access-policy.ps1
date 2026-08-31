[CmdletBinding()]
param(
    [string]$TaskName = "Lane Watch Agent Observer",
    [string]$ApplicationRoot = "C:\Users\wstri\dev\math-research\infrastructure\agent-observer"
)

$ErrorActionPreference = "Stop"
$runScript = Join-Path $ApplicationRoot "run.ps1"
$policyPath = Join-Path $ApplicationRoot "config\access-policy.json"
foreach ($path in @($runScript, $policyPath)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "Required Lane Watch file not found: $path"
    }
}

$arguments = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "{0}" -Port 4317 -AccessPolicyPath "{1}" -MacHost "macbook"' -f $runScript, $policyPath
$action = New-ScheduledTaskAction -Execute "C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe" -Argument $arguments
Set-ScheduledTask -TaskName $TaskName -Action $action | Out-Null

$configured = Get-ScheduledTask -TaskName $TaskName
[pscustomobject]@{
    TaskName = $configured.TaskName
    State = $configured.State
    Execute = $configured.Actions.Execute
    Arguments = $configured.Actions.Arguments
}
