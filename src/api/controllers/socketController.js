var clientsConnected = new Array();
exports.initserver = (io) =>{

    //io -> server qui emet // socket -> socket qui a appele le serveur
    //Init socket client
    io.sockets.on('connection', function (socket) {
        console.log("client connected !")
        clientsConnected.push(socket.id);
        socket.on('disconnecting', (reason) => {
            var userleft = socket.id+" left the chat !\n";
            console.log("client disconnected for " + reason + " !")
            var indexclientarray = clientsConnected.indexOf(socket.id);
            if(indexclientarray != -1){
                //Client find
                clientsConnected.splice(indexclientarray, 1);
            }else{
                console.log("not find")
            }
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
}
exports.get_sockets = (req,res) =>{
    res.status(200);
    res.json(clientsConnected.length);
};
