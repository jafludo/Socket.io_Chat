exports.initserver = (io) =>{
    
    //io -> server qui emet // socket -> socket qui a appele le serveur
    io.sockets.on('connection', function (socket) {
        console.log("client connected !")

        socket.on('disconnecting', (reason) => {
            var userleft = socket.id+" left the chat !\n";
            console.log("client disconnected for " + reason + " !")
            //socket.broadcast.emit('userdisconnected',userleft);
        });

        socket.on('userdisconnected', (data) => {
            socket.broadcast.emit('userdisconnected',data);
        });

        socket.on('messagetosend', (data) => {
            socket.broadcast.emit('messagetosend',data);
            socket.emit('messagetosend',data);
        });

        socket.on('messageget', (data) => {
            socket.broadcast.emit('messageget',data);
        });
        
    });
    nbConnectes();
}

function nbConnectes(){
    setInterval(function(){
        console.log("Hey !")
    },1000)
}