exports.initserver = (io) =>{

    //Session connexion client
    io.sockets.on('connection', function (socket) {
        console.log("client connected !")

        socket.on('disconnecting', (reason) => {
            console.log("client disconnected for " + reason + " !")
        });

    });

}