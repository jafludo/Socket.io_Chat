module.exports = (app) => {

    app.route('/')
    .get((req,res)=>{
        //Recup path
        var path = __dirname;
        //split path
        var chars = path.split('\\');
        //init construc public path
        var pathpublic = '';
        for(var i=0;i<7;i++){
            pathpublic+=chars[i]+='\\';
        }
        //render index.html
        return res.sendFile(pathpublic+'\\public\\index.html');
    })
    
}

