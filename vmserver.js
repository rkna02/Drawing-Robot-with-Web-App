var io = require('socket.io-client');
// var socket = io.connect("http://localhost:3000/", {
//     reconnection: true
// });

var socket = io.connect("http://cpen291-17.ece.ubc.ca", {
    reconnection: true
});
socket.on('connect', function () {
    console.log('connected to localhost:3000');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
        socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });

    socket.on('cmd_squr', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python',["test.py", 10]);
        pythonProcess.stdout.on('data', (data)=>{
            console.log("result is ", data.toString());
            console.log("finish fn");
        });

        pythonProcess.on('exit',() =>{
            console.log("sent back");
            socket.emit('CD1', "done");
            });
        });
        
});
