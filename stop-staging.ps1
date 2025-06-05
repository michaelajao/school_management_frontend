#!/usr/bin/env pwsh
# Stop School Management System - Staging Environment

Write-Host "Stopping School Management System - Staging Environment..." -ForegroundColor Yellow

# Check if docker-compose.staging.yml exists
if (-not (Test-Path "docker-compose.staging.yml")) {
    Write-Host "ERROR: docker-compose.staging.yml not found in current directory!" -ForegroundColor Red
    Write-Host "Please run this script from the workspace directory containing both frontend and backend repositories." -ForegroundColor Yellow
    exit 1
}

# Stop the services
docker-compose -f docker-compose.staging.yml down

if ($LASTEXITCODE -eq 0) {
    Write-Host "Staging environment stopped successfully!" -ForegroundColor Green
    Write-Host "`nTo remove all data (volumes), run:" -ForegroundColor Yellow
    Write-Host "docker-compose -f docker-compose.staging.yml down -v" -ForegroundColor White
    Write-Host "`nTo restart, run:" -ForegroundColor Yellow
    Write-Host ".\start-staging.ps1" -ForegroundColor White
} else {
    Write-Host "Failed to stop staging environment!" -ForegroundColor Red
    Write-Host "You may need to stop containers manually." -ForegroundColor Yellow
} 