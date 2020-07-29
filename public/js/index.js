var socket = io('http://localhost:8080');

socket.on('connect', function(){
    $('#textbox').val($('#textbox').val() + "anonymous join the tchat !"); 
});

socket.on('event', function(data){
    
});

socket.on('disconnect', function(){
    $('#textbox').val($('#textbox').val() + "anonymous left the tchat !"); 
});