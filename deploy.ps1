# DouDouJiang Cloudflare Pages Deployment Script
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $scriptDir

# Load .env.local if present
$envFile = Join-Path $scriptDir ".env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
            $parts = $line.Split("=", 2)
            $name = $parts[0].Trim()
            $value = $parts[1].Trim()
            [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

if (-not $env:CLOUDFLARE_API_KEY -or -not $env:CLOUDFLARE_EMAIL) {
    Write-Host "Missing CLOUDFLARE_API_KEY or CLOUDFLARE_EMAIL in environment or .env.local" -ForegroundColor Red
    exit 1
}

$wranglerPath = "C:\Users\Administrator\r2-webdav\node_modules\.bin\wrangler.cmd"
if (-not (Test-Path $wranglerPath)) {
    $wranglerCmd = Get-Command wrangler.cmd, wrangler -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($wranglerCmd) {
        $wranglerPath = $wranglerCmd.Source
    } else {
        $wranglerPath = "wrangler"
    }
}

Write-Host "Deploying DouDouJiang to Cloudflare Pages (doudoujiang.pages.dev)..." -ForegroundColor Cyan
& $wranglerPath pages deploy . --project-name=doudoujiang --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDeployment successful! Live at: https://doudoujiang.pages.dev/" -ForegroundColor Green
} else {
    Write-Host "`nDeployment failed with exit code $LASTEXITCODE." -ForegroundColor Red
}
