const User = require('../models/userModel');
const bcrypt = require('bcrypt')
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

exports.user_register = (req, res) => {
    let new_user = new User(req.body);
    let password = req.body.password;
  
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
}

exports.user_login = (req, res) => {
    let {body} = req;

    User.findOne({email: body.email})
    .then(user => {
        let hash = user.password;
        var result = bcrypt.compareSync(body.password, hash); // true
        if(result){
            let userData = {
                email: user.email,
                role: user.role
            }
            res.status(201);
            res.json({userData});
            /*
            jwt.sign({userData}, process.env.JWT_KEY, {expiresIn: '30 days'}, (error, token) => {
                if(error){
                res.status(500);
                console.log(error);
                res.json({message: "Erreur serveur."});
                }
                else {
                res.json({userData});
                }
            })
            */
        }
        else{
            res.status(500);
            res.json({message: "Erreur serveur."})
        }
    })
    .catch(error => {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
    })
}
  