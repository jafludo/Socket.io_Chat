const User = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
exports.list_all_users = (req, res) => {
    User.find({id: req.params._id}, (error, result) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json(result)
      }
    })
}
function EmailFind(req){
  var emailalreadyexist = false;
  return new Promise(resolve =>{
    User.find({email: req.body.email})     
    .then(result =>{
      if(result[0].email == req.body.email){
        //console.log("email found")
        emailalreadyexist = true;
        resolve(emailalreadyexist);
      }
    })
    .catch(error =>{
      //console.log("email not found")
      emailalreadyexist = false;
      resolve(emailalreadyexist);
    });
  })
}

function PseudoFind(req){
  var pseudoalreadyexist = false;
  return new Promise(resolve =>{
    User.find({pseudo: req.body.pseudo})     
    .then(result =>{
      if(result[0].pseudo == req.body.pseudo){
        //console.log("pseudo found")
        pseudoalreadyexist = true;
        resolve(pseudoalreadyexist);
      }
    })
    .catch(error =>{
      //console.log("pseudo not found")
      pseudoalreadyexist = false;
      resolve(pseudoalreadyexist);
    });
  })
}

exports.user_register = async function(req,res) {

  var pseudoalreadyexist = await PseudoFind(req);
  var emailalreadyexist = await EmailFind(req);

  if(pseudoalreadyexist == false && emailalreadyexist == false){

    let new_user = new User(req.body);
    let password = req.body.password;
    new_user.role = "Member";
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    new_user.password = hash;
    new_user.save()
    .then(user => {
      res.status(201);
      res.json(user);
    })
    .catch(error => {
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    })
  }else{
    
    if(pseudoalreadyexist == true){
      res.status(500);
      res.json({message: "Pseudo déjà utilisé !"})
      return;
    }
    if(emailalreadyexist == true){
      res.status(500);
      res.json({message: "Email déjà utilisé !"})
      return;
    }
  }
  
}
exports.get_payload = (req, res) => {
    let {token} = req.body;
    console.log("data : "+token); 
    try{
      var payload = jwt.verify(token, process.env.JWT);
      res.status(200);
      res.json(payload.userData); 
    }
    catch(error){
      res.status(500);
      res.json({message : "Error token !"}); 
    }
};

exports.user_login = (req, res) => {
    let {body} = req;

    User.findOne({email: body.email})
    .then(user => {
        let hash = user.password;
        var result = bcrypt.compareSync(body.password, hash); // true
        if(result){
            let userData = {
                pseudo : user.pseudo,
                email: user.email
            }
            jwt.sign({userData}, process.env.JWT, {expiresIn: '1 days'}, (error, token) => {
                if(error){
                res.status(500);
                console.log(error);
                res.json({message: "Erreur serveur."});
                }
                else {
                  res.status(200);
                  res.json(token);
                }
            })
        }
        else{
            res.status(201);
            res.json({message: "Bad email or password !"})
        }
    })
    .catch(error => {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
    })
}
  