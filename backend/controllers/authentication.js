const User = require("../models/user.js");
const jwt = require('jwt-simple');
const config = require('../config.js')

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp, }, config.secret);
}

exports.signin = function(req, res, next){
    //User has already had their email and password auth'd
    //We just need to give them a token

    res.send({ token : tokenForUser(req.user)});
}

exports.signup = function(req, res, next){
    
    const email = req.body.email;
    const password = req.body.password;
    //res.send({ sucess : 'true'});
    console.log("Inside SignUp API with data ", email , "---", password);

    if(!email || !password){
        return res.status(422).send(' You must have email and password')
    }

    User.findOne( { email : email }, (err, existingUser) => {

        console.log("Response from query is Error ", err);
        console.log("Response from query is existingUser ", existingUser);
 
        //See it the user with the given email exists
        if(err){ return next(err); }

       //If the the email does exists return an error
        if(existingUser){
            return res.status(422).send(' User already exists');
        }
       // else{
        //If the email does not exists create and save the user 
        const user = new User({
           email : email,
           password : password
        });

        user.save((err)=>{
            if(err){ return next(err);}
        //Respond the request with the email created signal
            res.json({ token : tokenForUser(user)});
        });
        //}
    });
 
}