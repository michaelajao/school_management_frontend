const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Railway requires binding to 0.0.0.0
const port = parseInt(process.env.PORT, 10) || 3000;

console.log(`Starting server in ${dev ? 'development' : 'production'} mode`);
console.log(`Environment variables:`, {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME
});

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.prepare()
  .then(() => {
    console.log('Next.js app prepared successfully');
    
    const server = createServer(async (req, res) => {
      try {
        // Add basic request logging for debugging
        if (dev) {
          console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        }
        
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    });

    server.once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`✓ Server ready at http://${hostname}:${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ Next.js version: ${require('next/package.json').version}`);
    });
    
    // Handle server startup timeout
    setTimeout(() => {
      console.log('Server has been running for 30 seconds - health check should pass');
    }, 30000);
  })
  .catch((err) => {
    console.error('Failed to prepare Next.js app:', err);
    process.exit(1);
  });