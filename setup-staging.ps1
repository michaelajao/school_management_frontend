# PowerShell script for setting up School Management System staging environment

# Make sure script is run from the frontend directory
if (-not (Test-Path "package.json") -or -not (Get-Content "package.json" | Select-String "school_management_frontend")) {
    Write-Error "Error: Please run this script from the school_management_frontend directory"
    exit 1
}

# Create necessary directories
New-Item -Path "nginx\ssl" -ItemType Directory -Force | Out-Null

# Check if .env.staging and .env.production exist, create if not
if (-not (Test-Path ".env.staging")) {
    Write-Output "Creating .env.staging file..."
    @"
# Frontend Environment Variables - Staging
NODE_ENV=staging
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_TELEMETRY_DISABLED=1

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=staging.schoolsms.local
NEXT_PUBLIC_ENABLE_REGISTRATION=true

# Features
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Multi-tenancy
NEXT_PUBLIC_ENABLE_MULTI_TENANT=true
NEXT_PUBLIC_DEFAULT_SCHOOL_DOMAIN=demo

# UI/UX
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Development
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_SHOW_DEBUG_INFO=true
"@ | Out-File -FilePath ".env.staging" -Encoding utf8
}

if (-not (Test-Path ".env.production")) {
    Write-Output "Creating .env.production file..."
    @"
# Frontend Environment Variables - Production
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_TELEMETRY_DISABLED=1

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=app.schoolsms.com
NEXT_PUBLIC_ENABLE_REGISTRATION=false

# Features
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Multi-tenancy
NEXT_PUBLIC_ENABLE_MULTI_TENANT=true
NEXT_PUBLIC_DEFAULT_SCHOOL_DOMAIN=login

# UI/UX
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Development
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_DEBUG_INFO=false
"@ | Out-File -FilePath ".env.production" -Encoding utf8
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Output "Installing frontend dependencies..."
    npm install
}

Write-Output "Checking backend directory..."
if (Test-Path "..\school_management_backend") {
    Push-Location -Path "..\school_management_backend"
    
    # Install backend dependencies if needed
    if (-not (Test-Path "node_modules")) {
        Write-Output "Installing backend dependencies..."
        npm install
    }
    
    # Return to frontend directory
    Pop-Location
}

# Create a .env file for docker-compose
Write-Output "Creating .env file for docker-compose..."
@"
# Docker Compose Environment Variables
DB_NAME=school_management
DB_USERNAME=postgres
DB_PASSWORD=postgres
REDIS_PASSWORD=redis_password
JWT_SECRET=school_management_jwt_secret_staging
JWT_EXPIRES_IN=1d
"@ | Out-File -FilePath ".env" -Encoding utf8

Write-Output "Setup complete!"
Write-Output "To start the staging environment, run: docker-compose -f docker-compose.staging.yml up -d"
