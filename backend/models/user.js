
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//create user schema
const userSchema = new Schema({
    email : { type: String, unique : true, lowercase : true},
    password : String
});

//On save hook, encrypt the password
//Before saving the model run this function
userSchema.pre('save', function(next){

    //get access to the user model
    const user = this;
    /** Here got an error because this is not defined in an arrow function */

    //generate the salt then run the callback
    bcrypt.genSalt(10, (err, salt) =>{
        if(err){ return next(err) }
        
        // hash(encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err){ return next(err)}

            //overwrite the plain text password with encrypted password
            console.log("text of hash is ", user.password);
            user.password = hash;
            console.log("text of hash$$ is this  ", userSchema.email);
            next();
        })

    })
});

// {.method }    Adds an instance method to documents constructed from Models compiled from this schema. 
//If a hash of name/fn pairs is passed as the only argument, each name/fn pair will be added as methods.
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){ return callback(err);}

        callback(null, isMatch);
    });
}


//create model class
const userModelClass = mongoose.model('user', userSchema);

//export model
module.exports = userModelClass;