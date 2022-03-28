
const http = require('http');  // http 
const fs = require('fs'); // file handler
const path = require('path');  // PATH finder
const hostname = 'cpen291-17.ece.ubc.ca';
const port = 80;

// create server, the function that is passed to createServer will be called whenever we request from the server
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url)
  let extName = path.extname(filePath)
  let contentType = 'text/html'

  switch (extName) {
    case '.css':
        contentType = 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;
  }

  console.log(`File path: ${filePath}`);
  console.log(`Content-Type: ${contentType}`)

  // Status code: 200
  // JSON: specify type of content to send for parsing
  res.writeHead(200, { 'Content-Type': contentType })  

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
})

server.listen(port, hostname, (error) => {
  if (error) {
    console.log('ERROR: failed to get information', error)
  } else {
    console.log('Server is listening on port' + port)
  }
})

