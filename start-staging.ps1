#!/usr/bin/env pwsh
# Start School Management System - Staging Environment
# Run this script from the workspace directory (containing both frontend and backend repos)

Write-Host "Starting School Management System - Staging Environment..." -ForegroundColor Green

# Check if docker-compose.staging.yml exists
if (-not (Test-Path "docker-compose.staging.yml")) {
    Write-Host "ERROR: docker-compose.staging.yml not found in current directory!" -ForegroundColor Red
    Write-Host "Please run this script from the workspace directory containing both frontend and backend repositories." -ForegroundColor Yellow
    exit 1
}

# Check if repositories exist
if (-not (Test-Path "school_management_frontend")) {
    Write-Host "ERROR: school_management_frontend directory not found!" -ForegroundColor Red
    Write-Host "Please ensure both repositories are cloned in this workspace." -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "school_management_backend")) {
    Write-Host "ERROR: school_management_backend directory not found!" -ForegroundColor Red
    Write-Host "Please ensure both repositories are cloned in this workspace." -ForegroundColor Yellow
    exit 1
}

# Start the services
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose -f docker-compose.staging.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nStaging environment started successfully!" -ForegroundColor Green
    Write-Host "`nServices available at:" -ForegroundColor Cyan
    Write-Host "  Frontend:        http://localhost:3000" -ForegroundColor White
    Write-Host "  Backend API:     http://localhost:4000" -ForegroundColor White
    Write-Host "  Database Admin:  http://localhost:8080" -ForegroundColor White
    Write-Host "  Redis Commander: http://localhost:8081" -ForegroundColor White
    Write-Host "`nTo view logs: docker-compose -f docker-compose.staging.yml logs -f" -ForegroundColor Yellow
    Write-Host "To stop: docker-compose -f docker-compose.staging.yml down" -ForegroundColor Yellow
} else {
    Write-Host "`nFailed to start staging environment!" -ForegroundColor Red
    Write-Host "Check the error messages above and try again." -ForegroundColor Yellow
} 