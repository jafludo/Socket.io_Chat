$("#form-login").submit(function(event) {

    //Register can be execute all fields are validate !
    if($("#login-email").hasClass("alert-validate")  
    || $("#login-pass").hasClass("alert-validate")){
        event.preventDefault();
    }else{

        var email = $("#login-email-input").val();
        var password = $("#login-pass-input").val();
        
        $.ajax({
            url : 'http://127.0.0.1:8080/users/login', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                email: email,
                password: password
            },

            success: function(data, textStatus, xhr){
                //If user logged
                if(xhr.status == 200){
                    var token = data;
                    sessionStorage.setItem('token', token);
                    //Custom redirect
                    window.location.href = "index.html";
                }
            },
            error: function(e) {
                console.log(e);
                console.log("hey")
            }
        });
        
       //Cancel form redirect
       //event.preventDefault();
    }
    event.preventDefault();
});