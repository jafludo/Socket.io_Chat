exports.initserver = (io) =>{

    //io -> server qui emet // socket -> socket qui a appele le serveur
    io.sockets.on('connection', function (socket) {
        console.log("client connected !")

        socket.on('disconnecting', (reason) => {
            console.log("client disconnected for " + reason + " !")
            socket.broadcast.emit('userdisconnected',"anonymous left the tchat !\n");
        });

        socket.on('messageget', (data) => {
            socket.broadcast.emit('messageget',data);
        });
        
    });

}