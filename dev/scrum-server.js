const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

const port = 3000;
const dataFile = path.join(__dirname, 'scrumData.json');
const htmlFile = path.join(__dirname, 'scrum.html');

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function handleData(req, res) {
  if (req.method === 'GET') {
    fs.readFile(dataFile, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading data');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      fs.writeFile(dataFile, body || '{}', err => {
        if (err) {
          res.writeHead(500);
          res.end('Error saving data');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
      });
    });
  } else {
    res.writeHead(405);
    res.end();
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  if (parsed.pathname === '/data') {
    handleData(req, res);
  } else if (parsed.pathname === '/') {
    sendFile(res, htmlFile, 'text/html');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Scrum board running at http://localhost:${port}`);
  openBrowser(`http://localhost:${port}`);
});

function openBrowser(target) {
  const platform = process.platform;
  let cmd;
  if (platform === 'win32') {
    cmd = `start "" "${target}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${target}"`;
  } else {
    cmd = `xdg-open "${target}"`;
  }
  exec(cmd, err => {
    if (err) {
      console.log('Could not open browser');
    }
  });
}
