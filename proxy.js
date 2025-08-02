const http = require('http');
const https = require('https');

const TARGET_HOST = '162.159.128.233';
const TARGET_PORT = 443;
const LOCAL_PORT = 8010;

const server = http.createServer((req, res) => {
  console.log(`Proxying request to ${req.url}`);
  
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  // Update host header to target
  options.headers.host = 'discord.com';
  
  const proxy_req = https.request(options, (proxy_res) => {
    res.writeHead(proxy_res.statusCode, proxy_res.headers);
    proxy_res.pipe(res, { end: true });
  });

  req.pipe(proxy_req, { end: true });

  proxy_req.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500);
    res.end('Proxy error: ' + err.message);
  });
});

server.listen(LOCAL_PORT, () => {
  console.log(`Proxy server running at http://localhost:${LOCAL_PORT}/`);
  console.log(`Forwarding to https://${TARGET_HOST}:${TARGET_PORT}`);
});
