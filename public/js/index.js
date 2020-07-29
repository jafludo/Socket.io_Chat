var socket = io('http://localhost:8080');
socket.on('connect', function(socketd){
    var date = formatDate();
    var joinmsg = date + " " + socket.id+" join the chat !\n";
    $('#textbox').val($('#textbox').val() + joinmsg); 
    socket.emit('messageget', joinmsg);
});

$("#TextToSend").keypress(function( event ) {
    if(event.key == "Enter"){
        sendMessage();
    }
});

$("#buttonSendText").click(function() {
    sendMessage();
});

socket.on('disconnect', function(){
    var date = formatDate();
    var leftmsg = date + socket.id + " " + " left the chat !\n";
    $('#textbox').val($('#textbox').val() + leftmsg); 
});

socket.on('messagetosend', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

socket.on('userdisconnected', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

socket.on('messageget', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

function sendMessage(){
    var date = formatDate();
    var texttosend = date + " " + socket.id + " : " +$("#TextToSend").val() + "\n";
    if($("#TextToSend").val() != ""){
        socket.emit('messagetosend', texttosend);
    }
}

function formatDate(){
    var date = new Date();
    var dateHeures = date.getHours();
    var dateMinutes = date.getMinutes();
    if(dateMinutes <= 9){
        var temp = dateMinutes;
        var dateMinutes = "0" + temp.toString();
    }
    var stringDate  = dateHeures + ":" + dateMinutes + " -";
    return stringDate;
}