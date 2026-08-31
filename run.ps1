[CmdletBinding()]
param(
    [int]$Port = 4317,
    [string]$HostAddress = "127.0.0.1",
    [string]$AllowedTailscaleUsers = "",
    [string]$AccessPolicyJson = "",
    [string]$AccessPolicyPath = "",
    [string]$MacHost = "macbook"
)

$ErrorActionPreference = "Stop"
$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$profileRoot = [Environment]::GetFolderPath("UserProfile")
$bun = Join-Path $profileRoot ".bun\bin\bun.exe"
if (-not (Test-Path -LiteralPath $bun -PathType Leaf)) {
    throw "Bun executable not found at $bun"
}

$dataRoot = Join-Path $appRoot "data"
New-Item -ItemType Directory -Path $dataRoot -Force | Out-Null
$logPath = Join-Path $dataRoot "scheduled-task.log"
$env:OBSERVER_PORT = [string]$Port
$env:OBSERVER_HOST = $HostAddress
$env:OBSERVER_MAC_HOST = $MacHost
if (-not [string]::IsNullOrWhiteSpace($AllowedTailscaleUsers)) {
    $env:OBSERVER_ALLOWED_TAILSCALE_USERS = $AllowedTailscaleUsers
}
if (-not [string]::IsNullOrWhiteSpace($AccessPolicyJson)) {
    $env:OBSERVER_ACCESS_POLICY_JSON = $AccessPolicyJson
}
if (-not [string]::IsNullOrWhiteSpace($AccessPolicyPath)) {
    $resolvedAccessPolicyPath = [System.IO.Path]::GetFullPath($AccessPolicyPath)
    if (-not (Test-Path -LiteralPath $resolvedAccessPolicyPath -PathType Leaf)) {
        throw "Access policy file not found at $resolvedAccessPolicyPath"
    }
    $env:OBSERVER_ACCESS_POLICY_JSON = Get-Content -LiteralPath $resolvedAccessPolicyPath -Raw
}
Set-Location -LiteralPath $appRoot

Start-Transcript -Path $logPath -Append | Out-Null
try {
    while ($true) {
        try {
            $health = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/api/health" -TimeoutSec 2
            if ($health.ok) {
                Start-Sleep -Seconds 15
                continue
            }
        } catch {
            # No healthy listener: launch or relaunch it below.
        }

        Write-Output "[$(Get-Date -Format o)] Starting Lane Watch on 127.0.0.1:$Port"
        & $bun src/server.ts
        $exitCode = $LASTEXITCODE
        Write-Warning "[$(Get-Date -Format o)] Lane Watch exited with code $exitCode; retrying in 5 seconds"
        Start-Sleep -Seconds 5
    }
} finally {
    Stop-Transcript -ErrorAction SilentlyContinue
}
