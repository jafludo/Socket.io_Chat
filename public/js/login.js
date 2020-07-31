$("#form-login").submit(function(event) {

    //Register can be execute all fields are validate !
    if($("#login-email").hasClass("alert-validate")  
    || $("#login-pass").hasClass("alert-validate")){
        event.preventDefault();
        console.log("not good !")
    }else{
        var email = $("#login-email-input").val();
        var password = $("#login-pass-input").val();
        console.log("good !");
        
        $.ajax({
            url : 'http://127.0.0.1:8080/users/login', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                email: email,
                password: password
            },

            success: function(data, textStatus, xhr){
                console.log(data);
                console.log(xhr.status);
            },
            error: function(e) {
                console.log(e);
                console.log("hey")
            }
        });
        
       //Cancel form redirect
       //event.preventDefault();

       //Custom redirect
       //window.location.href = "index.html";

       $.ajax({
        url : 'http://127.0.0.1:8080/index.html', // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.

        success: function(data){
            //redirect index.js
        },
        error: function(e) {
            console.log(e);

        }
    });
    }
    event.preventDefault();
});