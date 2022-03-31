
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
  socket.emit('clientEvent', 'hello from vm server');

  socket.on('serverEvent', (msg) => {
    console.log("client sent", msg);
  });

  socket.on('forward_cmd', function (message) {
    console.log(message);
    
    
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["forward.py"]);
    pythonProcess.on("exit",() =>{
      // console.log("Sending signal")
      socket.emit('Done2', "done");
      // process.exit(0);
    });
    console.log("Sent signal to client");

  });
  
  socket.on('backward_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["backward.py"]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done2', "done");
    });
    // to test forward function, erase 10
  });


  socket.on('right_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["right.py"]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done2', "done");
    });
    // to test forward function, erase 10
  });


  socket.on('left_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["left.py"]);
    // to test forward function, erase 10
    pythonProcess.on("exit",() =>{
      socket.emit('Done2', "done");
    });
  });

  socket.on('up', function (message) {
    console.log(message.toString());
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["penUp.py"]);
    // to test forward function, erase 10
    pythonProcess.on("exit",() =>{
      socket.emit('Done2', "done");
    });
  });


  socket.on('down', function (message) {
    console.log(message.toString());
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["penDown.py"]);
    // to test forward function, erase 10
    pythonProcess.on("exit",() =>{
      socket.emit('Done2', "done");
    });
  });

  socket.on('input', function(input){
    input = input.toLowerCase();
    console.log(input);
    const spawn = require("child_process").spawn;
    if (input == "circle"){
      console.log("exec circle");
      const pythonProcess = spawn('python3', ["dr_cir.py"]);
    }
    else if (input == "triangle"){
      console.log("exec triangle");
      const pythonProcess = spawn('python3', ["dr_tri.py"]);
    }
    else if (input == "square"){ 
      console.log("exec square");
      const pythonProcess = spawn('python3', ["dr_squ.py"]);
    }
    else if (input == "rectangle"){
      console.log("exec rectangle");
      const pythonProcess = spawn('python3', ["dr_rec.py"]);
    }
    else if (input == "heart"){
      console.log("exec heart");
      const pythonProcess = spawn('python3', ["dr_heart.py"]);
    }
    else if (input == "oval"){
      console.log("exec oval");
      const pythonProcess = spawn('python3', ["dr_oval.py"]);
    }
    else{
      console.log("unknown shape");
    }

    pythonProcess.on("exit",() =>{
      socket.emit('Done1', "done");
    });
  })

  socket.on('square_cmd', function (message) {
    // const spawn = require("child_process").spawn;
    // const pythonProcess = spawn('python3',["dr_squ.py"]);
    // pythonProcess.on("exit",() =>{
    //   socket.emit('Done1', "done");
    // });
    socket.broadcast.emit('cmd_squr', message);
  });

  socket.on('CD1', (msg) =>{
    socket.broadcast.emit('Done1', "done");
  });

  socket.on('triangle_cmd', function (message) {
    // const spawn = require("child_process").spawn;
    // const pythonProcess = spawn('python3',["dr_tri.py"]);
    // pythonProcess.on("exit",() =>{
    //   socket.emit('Done1', "done");
    // });
    socket.broadcast.emit('cmd_squr', message);
  });

  socket.on('circle_cmd', function (message) {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["test.py", 10]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done1', "done");
    });
  });

  socket.on('rectangle_cmd', function (message) {
    console.log(message);
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["dr_rec.py"]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done1', "done");
    });
  });

  socket.on('heart_cmd', function (message) {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["dr_heart.py"]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done1', "done");
    });
  });

  socket.on('oval_cmd', function (message) {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["dr_oval.py"]);
    pythonProcess.on("exit",() =>{
      socket.emit('Done1', "done");
    });
  });

  socket.on("disconnect", ()=>{
    console.log("user disconnects");
  })


  // socket.on('greeting-from-btn', function (message) {
  //   console.log(message);
  // });
});

server.listen(3000);

//comment out this section when running on VM
/*
server.listen(port, hostname, (error) => {
  if (error) {
     console.log('ERROR: failed to get information', error)
  } else {
    console.log('Server is listening on port' + port)
   }
 });
*/
