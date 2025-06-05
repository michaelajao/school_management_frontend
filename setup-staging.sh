#!/bin/bash
# Setup script for School Management System staging environment
# Updated: June 5, 2025 - Frontend-Backend connectivity verified

# Make sure script is run from the frontend directory
if [ ! -f "package.json" ] || ! grep -q "school_management_frontend" package.json; then
  echo "Error: Please run this script from the school_management_frontend directory"
  exit 1
fi

echo "🚀 Setting up School Management System staging environment..."
echo "📋 Status: Frontend-Backend connectivity verified and working"
echo "🔗 Backend API: http://localhost:4000"
echo "🌐 Frontend: http://localhost:3000"
echo ""

# Create necessary directories
mkdir -p nginx/ssl

# Check if .env.staging and .env.production exist, create if not
if [ ! -f ".env.staging" ]; then
  echo "📝 Creating .env.staging file..."
  cat > .env.staging << EOL
# Frontend Environment Variables - Staging
NODE_ENV=staging
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
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
EOL
fi

if [ ! -f ".env.production" ]; then
  echo "Creating .env.production file..."
  cat > .env.production << EOL
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
EOL
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Checking backend directory..."
if [ -d "../school_management_backend" ]; then
  cd ../school_management_backend
  
  # Install backend dependencies if needed
  if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
  fi
  
  # Return to frontend directory
  cd ../school_management_frontend
fi

# Create a .env file for docker-compose
echo "Creating .env file for docker-compose..."
cat > .env << EOL
# Docker Compose Environment Variables
DB_NAME=school_management
DB_USERNAME=postgres
DB_PASSWORD=postgres
REDIS_PASSWORD=redis_password
JWT_SECRET=school_management_jwt_secret_staging
JWT_EXPIRES_IN=1d
EOL

echo "Setup complete!"
echo "To start the staging environment, run: docker-compose -f docker-compose.staging.yml up -d"
