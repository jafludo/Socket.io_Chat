var socket = io('http://localhost:8080');

socket.on('connect', function(){
    console.log(socket.id)
});

socket.on('event', function(data){
    
});

socket.on('disconnect', function(){

});