
const http = require('http'); // http module
const fs = require('fs'); // file handler
const path = require('path'); // PATH finder
const hostname = 'cpen291-17.ece.ubc.ca'; // hostname 
const port = 80; // port number
const {Server} = require("socket.io"); // sockets for request and answers

// Create server and read frontend files for webpage

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

  res.writeHead(200, { 'Content-Type': contentType })  

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Backend requests and answers sockets

const io = new Server(server);

io.on("connection", (socket) =>{

  // Shows user connection message on terminal 
  console.log("user connected");
  socket.emit('clientEvent', 'hello from vm server');

  socket.on('serverEvent', (msg) => {
    console.log("client sent", msg);
  });

  // Mode 1 Option 2: Write Text sockets

  socket.on('input', function(input){
    input = input.toLowerCase();
    console.log(input);
    
    if (input == "circle"){
      socket.broadcast.emit('cmd_circle', input);
    }
    else if (input == "triangle"){
      socket.broadcast.emit('cmd_triangle', input);
    }
    else if (input == "square"){ 
      socket.broadcast.emit('cmd_square', input);
    }
    else if (input == "rectangle"){
      socket.broadcast.emit('cmd_rectangle', input);
    }
    else if (input == "heart"){
      socket.broadcast.emit('cmd_heart', input);
    }
    else if (input == "oval"){
      socket.broadcast.emit('cmd_oval', input);
    }
    else if (input == "cpen"){
      socket.broadcast.emit('cmd_cpen', input);
    }
    else{
      console.log("unknown shape");
    }
  });

  // Mode 1 Option 1: Draw Shape sockets 

  socket.on('square_cmd', function (message) {
    socket.broadcast.emit('cmd_square', message);
  });

  socket.on('triangle_cmd', function (message) {
    socket.broadcast.emit('cmd_triangle', message);
  });

  socket.on('circle_cmd', function (message) {
    socket.broadcast.emit('cmd_circle', message);
  });

  socket.on('rectangle_cmd', function (message) {
    socket.broadcast.emit('cmd_rectangle', message);
  });

  socket.on('heart_cmd', function (message) {
    socket.broadcast.emit('cmd_heart', message);
  });

  socket.on('oval_cmd', function (message) {
    socket.broadcast.emit('cmd_oval', message);
  });

  // Done message for mode 1
  socket.on('CD1', (msg) =>{
    socket.broadcast.emit('Done1', msg);
  });

  // Mode 2: Controller sockets 
  socket.on('back_left_cmd', function (message) {
    socket.broadcast.emit('cmd_back_left', message);
  });
  socket.on('back_right_cmd', function (message) {
    socket.broadcast.emit('cmd_back_right', message);
  });
  socket.on('forward_cmd', function (message) {
    socket.broadcast.emit('cmd_forward', message);
  });
  
  socket.on('backward_cmd', function (message) {
    socket.broadcast.emit('cmd_backward', message);
  });

  socket.on('right_cmd', function (message) {
    socket.broadcast.emit('cmd_right', message);
  });

  socket.on('left_cmd', function (message) {
    socket.broadcast.emit('cmd_left', message);
  });

  socket.on('up', function (message) {
    socket.broadcast.emit('cmd_up', message);
  });

  socket.on('down', function (message) {
    console.log('qeqeqeqe');
    socket.broadcast.emit('cmd_down', message);
  });

  // Shows done message on terminal for mode 2 
  socket.on('CD2', (msg) =>{
    socket.broadcast.emit('Done2', msg);
  });

  // Disconenction message shows on terminal 
  socket.on("disconnect", ()=>{
    console.log("user disconnects");
  })

});

// Server listening to VM host 

server.listen(8000);

/*
server.listen(port, hostname, (error) => {
  if (error) {
     console.log('ERROR: failed to get information', error)
  } else {
    console.log('Server is listening on port' + port)
   }
 });
 */
 
