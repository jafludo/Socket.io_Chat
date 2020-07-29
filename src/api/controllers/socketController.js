exports.initserver = (io) =>{

    //io -> server qui emet // socket -> socket qui a appele le serveur
    io.sockets.on('connection', function (socket) {
        console.log("client connected !")

        socket.on('disconnecting', (reason) => {
            var userleft = socket.id+" left the tchat !\n";
            console.log("client disconnected for " + reason + " !")
            socket.broadcast.emit('userdisconnected',userleft);
        });

        socket.on('messageget', (data) => {
            socket.broadcast.emit('messageget',data);
        });
        
    });

}