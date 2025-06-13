# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Add necessary system dependencies for sharp (image optimization)
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps needed for build)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application for production
RUN npm run build

# Remove dev dependencies after build to reduce image size
RUN npm prune --production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permissions for the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port 3000 (Railway will map this to the assigned PORT)
EXPOSE 3000

# Start the application with custom server for better port handling
CMD ["node", "server.js"] 