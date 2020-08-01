var socket = io('http://localhost:8080');
// var randomid = Math.floor(Math.random() * 999999) + 1;
// var User = "Anonymous"+randomid;
// $('#textuserp').text($('#textuserp').text() + "Connected as " +User.toString());
// sessionStorage.setItem('sessionid',User);

$(document).ready(function() {
    var token = sessionStorage.getItem('token');
    if(token == undefined){
        window.location.href = "login.html";
    }
});

socket.on('connect', function(socketd){
    var sessionid = sessionStorage.getItem('sessionid');
    if(sessionid == undefined){
        sessionStorage.setItem('sessionid', (User).toString());
        var date = formatDate();
        var joinmsg = date + " " + User+" join the chat !\n";
        $('#textbox').val($('#textbox').val() + joinmsg); 
        socket.emit('messageget', joinmsg);
        
    }    
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

});

socket.on('messagetosend', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

socket.on('userdisconnected', function(data){
     var date = formatDate();
     var playerleft = date + " " + data;
     $('#textbox').val($('#textbox').val() + playerleft);
});

socket.on('messageget', function(data){
    $('#textbox').val($('#textbox').val() + data);
});

function sendMessage(){
    var date = formatDate();
    var texttosend = date + " " + User + " : " +$("#TextToSend").val() + "\n";
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