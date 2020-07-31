$("#form-register").submit(function(event) {

    //Register can be execute all fields are validate !
    if($("#register-pseudo").hasClass("alert-validate") 
    || $("#register-email").hasClass("alert-validate") 
    || $("#register-pass").hasClass("alert-validate")){
        event.preventDefault();
        console.log("not good !")
    }else{
        var pseudo = $("#register-pseudo-input").val();
        var email = $("#register-email-input").val();
        var password = $("#register-pass-input").val();
        console.log("good !")
        
        $.ajax({
            url : 'http://127.0.0.1:8080/users/register', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                pseudo: pseudo,
                email: email,
                password: password
            },

            success: function(data){
                //redirect index.js
            },
            error: function(e) {
                console.log(e);

            }
        });
        
       //Cancel form redirect
       event.preventDefault();

       //Custom redirect
       window.location.href = "login.html";
    }
    
});