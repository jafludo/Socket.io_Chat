var socket = io('http://localhost:8080');

socket.on('connect', function(socketd){
    var joinmsg = "anonymous join the tchat !\n";
    $('#textbox').val($('#textbox').val() + joinmsg); 
    socket.emit('messageget', joinmsg);
});

socket.on('disconnect', function(){
    var leftmsg = "anonymous left the tchat !\n";
    $('#textbox').val($('#textbox').val() + leftmsg); 
});

socket.on('userdisconnected', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

socket.on('messageget', function(data){
    $('#textbox').val($('#textbox').val() + data);
});