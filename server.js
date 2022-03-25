const http = require('http');

const port = 3000;

// create server, the function that is passed to createServer will be called whenever we request from the server
const server = http.createServer((req, res) => {
  /*
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  */
})

server.listen(port, function(error) {
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