// Simple test script to verify server starts correctly
const http = require('http');

const testPort = process.env.PORT || 3000;
const testUrl = `http://localhost:${testPort}`;

console.log('Testing server startup...');

// Give the server some time to start
setTimeout(() => {
  const req = http.request(testUrl, (res) => {
    console.log(`Server responded with status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Server is running correctly!');
    } else {
      console.log('❌ Server returned non-200 status');
    }
    process.exit(res.statusCode === 200 ? 0 : 1);
  });

  req.on('error', (err) => {
    console.error('❌ Server test failed:', err.message);
    process.exit(1);
  });

  req.setTimeout(10000, () => {
    console.error('❌ Server test timed out');
    req.destroy();
    process.exit(1);
  });

  req.end();
}, 5000);

console.log(`Waiting 5 seconds then testing ${testUrl}...`);