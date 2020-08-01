var socket = io('http://localhost:8080');

function callAjaxAuth(token){
    return new Promise(resolve =>{
        $.ajax({
            url : 'http://127.0.0.1:8080/auth', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.
    
            data : {
                token: token
            },
    
            success: function(data, textStatus, xhr){
                successAuth(data,resolve);
            },
            error: function(e) {
                console.log(e);
            }
        });
    })
}

function successAuth(data,resolve){
    var button = $("<button></button>")
    .addClass("btn btn-info float-right")
    .text("Logged as : "+data.pseudo)
    $("#UserDisplay").append(button);
    resolve(data);
}

socket.on('connect', async function(socketd){
    var token = sessionStorage.getItem('token');
    if(token == undefined){
        window.location.href = "login.html";
    }else if(token){
        var response = await callAjaxAuth(token);
        if(!sessionStorage.getItem('username')){
            DisplayInfoAndEmitSocket(response);
        }
    }
});

//Wait Ajax request for username then emit your socket + Display
function DisplayInfoAndEmitSocket(response){
    sessionStorage.setItem('username',response.pseudo);
    var date = formatDate();
    var user = sessionStorage.getItem('username');
    var joinmsg = date + " " + user +" join the chat !\n";
    $('#textbox').val($('#textbox').val() + joinmsg);
    socket.emit('messageget', joinmsg);  
}


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
    var user = sessionStorage.getItem('username');
    var texttosend = date + " " + user + " : " +$("#TextToSend").val() + "\n";
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