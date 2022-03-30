
const http = require('http');  // http 
const fs = require('fs'); // file handler
const path = require('path');  // PATH finder
//comment out host name and port when testing on VM
const hostname = 'cpen291-17.ece.ubc.ca';
const port = 80;
const {Server} = require("socket.io");
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

  // console.log(`File path: ${filePath}`);
  // console.log(`Content-Type: ${contentType}`)

  // Status code: 200
  // JSON: specify type of content to send for parsing
  res.writeHead(200, { 'Content-Type': contentType })  

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

const io = new Server(server);

io.on("connection", (socket) =>{
  // socket.emit('greeting-from-server', {
  //   greeting: 'Hello Client'
  // });
  // socket.on('greeting-from-client', function (message) {
  //   console.log(message);
  // });

  console.log("user connected");
  socket.on('forward_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["forward.py"]);
  });

  socket.on('backward_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["backward.py"]);
    // to test forward function, erase 10

    pythonProcess.on("exit", ()=>{
      process.exit(0);
    });
  });


  socket.on('right_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["right.py"]);
    // to test forward function, erase 10

    pythonProcess.on("exit", ()=>{
      process.exit(0);
    });
  });


  socket.on('left_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["left.py"]);
    // to test forward function, erase 10

    pythonProcess.on("exit", ()=>{
      process.exit(0);
    });
  });

  socket.on('up', function (message) {
    console.log(message.toString());
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["penUp.py"]);
    // to test forward function, erase 10

    pythonProcess.on("exit", ()=>{
      process.exit(0);
    });
  });


  socket.on('down', function (message) {
    console.log(message.toString());
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["penDown.py"]);
    // to test forward function, erase 10

    pythonProcess.on("exit", ()=>{
      process.exit(0);
    });
  });

  socket.on('square_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_squ.py"]);

  });

  socket.on('triangle_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_tri.py"]);
  });

  socket.on('circle_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_cir.py"]);
  });

  socket.on('rectangle_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_rec.py"]);
  });

  socket.on('heart_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_heart.py"]);
  });

  socket.on('oval_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["dr_oval.py"]);
  });


  socket.on("disconnect", ()=>{
    console.log("user disconnects");
  })


  // socket.on('greeting-from-btn', function (message) {
  //   console.log(message);
  // });
})


server.listen(8000);

//comment out this section when running on VM
/*
server.listen(port, hostname, (error) => {
  if (error) {
     console.log('ERROR: failed to get information', error)
  } else {
    console.log('Server is listening on port' + port)
   }
 })*/


