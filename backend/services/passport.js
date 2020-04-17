const passport = require('passport');
const User = require('../models/user.js');
const config = require("../config.js");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = { usernameField : 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    //Verify the username and password and call done with the user
    //If it is correct username and password 
    //Otherwise call done with false
    User.findOne({ email : email}, function(err, user){
        if(err){ return done(err);}
        if(!user) { return done(null, false); }
        // compare passwords - is 'password' equal to user.password?
        user.comparePassword(password, function(err, isMatch){
            if(err){ return done(err);}
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        })

    })

});

//Set options for jwt strategy
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

//See if the UserID in the payload exists in our DB
//If it does call done with that 
//otherwise call done without that

User.findById(payload.sub
    , function(err, user){
    if(err){ return done(err, false);}

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
