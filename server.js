#!/usr/bin/env node
/**
 * Next.js Production Server Entry Point
 * Used by PM2 to start the production server with proper memory management
 */

const { createServer } = require('http');
const path = require('path');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || 'localhost';

async function start() {
  try {
    console.log(`[${new Date().toISOString()}] Starting Next.js production server...`);
    
    // Import Next.js app
    const app = require('next');
    const nextApp = app({
      dev: false,
      dir: path.join(__dirname)
    });

    const handle = nextApp.getRequestHandler();

    // Prepare the Next.js app
    console.log(`[${new Date().toISOString()}] Preparing Next.js app...`);
    await nextApp.prepare();

    // Create server
    createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal server error');
      }
    }).listen(port, hostname, () => {
      console.log(`[${new Date().toISOString()}] ✓ Server running at http://${hostname}:${port}`);
      console.log(`[${new Date().toISOString()}] Ready to accept requests`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

start();
