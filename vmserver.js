var io = require('socket.io-client');
// var socket = io.connect("http://localhost:3000/", {
//     reconnection: true
// });

var socket = io.connect("http://cpen291-17.ece.ubc.ca", {
    reconnection: true
});
socket.on('connect', function () {
    console.log('connected to cpen 291 page');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
        socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });

    //mode 1
    socket.on('cmd_square', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_squ.py"]);
        // pythonProcess.stdout.on('data', (data)=>{
            //     console.log("result is ", data.toString());
            //     console.log("finish fn");
            // });    
            pythonProcess.on('exit',() =>{
                console.log("finish fn ", msg);
                console.log("sent back");
                socket.emit('CD1', "done");
            });
    });
        
    socket.on('cmd_triangle', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_tri.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD1', "done");
        });
    });

    socket.on('cmd _rectangle', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_rec.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD1', "done");
        });
    });
    
    
    socket.on('cmd_circle', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_cir.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD1', "done");
        });
    });
    
    socket.on('cmd_heart', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_heart.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD1', "done");
        });
    });

    socket.on('cmd_oval', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["dr_oval.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD1', "done");
        });
    });


    //mode 2
    socket.on('cmd_forward', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["forward.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });
    socket.on('cmd_backward', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["backward.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });
    socket.on('cmd_right', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["right.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });

    socket.on('cmd_left', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["left.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });
    socket.on('cmd_down', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["penDown.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });
    socket.on('cmd_up', function (msg){
        console.log("user press ", msg);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["penUp.py"]);
        
        pythonProcess.on('exit',() =>{
            console.log("finish fn ", msg);
            console.log("sent back");
            socket.emit('CD2', "done");
        });
    });

});

socket.on("disconnect", () =>{
    console.log("Server disconnects");
    process.exit(0);
})
