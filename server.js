const http = require('http')  // http 
const fs = require('fs')  // file handler
const path = require('path');  // PATH finder
const port = 3000;

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
/*
  fs.readFile('index.html', (error, data) => {
    // error: error if any arises 
    // data: all the data of the specified file
    if (error) {
      res.writeHead(404)
      res.write('ERROR: File not found')
    } else {
      res.write(data)  // write back to server requested data
    }

    res.end()  // ending server
  })
})*/

server.listen(port, (error) => {
  if (error) {
    console.log('ERROR: failed to get information', error)
  } else {
    console.log('Server is listening on port' + port)
  }
})








/*
// var http = require('http');
// var fs = require('fs');


// //create a server object:
// http.createServer(function handler (req, res) {
//     fs.readFile('./index.html', function(err, data) { //read file index.html in public folder
//         if (err) {
//           res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
//           return res.end("404 Not Found");
//         }
//         res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
//         res.write(data); //write data from index.html
//         return res.end();
//     });
// }).listen(8080); //the server object listens on port 8080

function move_forward(){

  document.getElementById("forward").value ="forward"
}

function move_backward(){
  document.getElementById("backward").value ="backward"
}

function move_right(){
  document.getElementById("right").value ="right"
}

function move_left(){
  document.getElementById("left").value ="left"
}

// document.getElementById("forward").addEventListener("keydown", (w) =>{
//   document.getElementById("forward").value ="forward"
// });

// // document.getElementById("forward").addEventListener("keyup", (w) =>{
// //   document.getElementById("forward").value ="w"
// // });
*/