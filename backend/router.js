const Authentication = require('./controllers/authentication.js');
const passportService = require("./services/passport");
const passport = require("passport");
const FileUpload = require("./controllers/fileUpload.js");

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session : false});

module.exports = function(app){
    app.get('/',requireAuth, function(req, res){
        res.send({ hi : 'there'});
    });
    app.post('/uploads', FileUpload.upload.single("file"), function(req, res){
        res.send({ file : req.file});
       // FileUpload.getFileName(req, res,req.file);
        console.log("After---------------------------")
    });
    app.get('/image/:filename', FileUpload.getFileName);
    app.post("/files/:filename", FileUpload.deleteFile);

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

}