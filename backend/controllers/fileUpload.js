const User = require("../models/user.js");
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
require('dotenv').config();
Grid.mongo = mongoose.mongo;
var gfs;

//DB setup
const uri = process.env.MONGO_URL;

// router(app);
//exports.fileUpload = function(req, res, next){
    const conn = mongoose.createConnection(uri,{ useNewUrlParser : true, useCreateIndex : true });

        conn.once('open', function () {
                gfs = Grid(conn.db);
                gfs.collection("uploads");
            // all set!
        });
        //Storage
        var storage = new GridFsStorage({
            url: uri,
            file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'//Should match collection name
                };
                resolve(fileInfo);
                });
            });
            }
        });
        exports.upload = multer({ storage });



        exports.getFileName = (req, res) => {
            var buffer="";
            
                gfs.files.findOne({filename : req.params.filename }, (err, file) => {
                if(!file || file.length === 0){
                    return res.status(404).json({
                        err : "No file exists length"
                    });
                }
                if(file.contentType === "image/jpeg" || file.contentType === "image/png" || file.contentType === "application/pdf" 
                  || file.contentType === "text/plain"){
                     
                    //const readStream = gfs.createReadStream(file.filename);
                    //console.log("file----------------",file.filename);
                 //   res["filename"] = file.filename;
                 //   console.log("file----------------", res);
                //   readStream.pipe(res);
                //    // res.json(file)
                    //res.send(file);

                     const readstream = gfs.createReadStream(file.filename);
                     readstream.on('data', (chunk) => {
                        buffer += chunk.toString('base64'); 
                     });
                     readstream.on("end", function () {
                        res.json({ image: buffer.toString('base64'), filename : file.filename });
                    });
                }else{
                    return res.status(404).json({
                        err : "No file exists different type"
                    });
                }
                //return res.json(file);
            });
        
        }
  
//Display single file Obj
// exports.getFileName = (req, res) => {
//     gfs.findOne({fileName : req.params.filename}, (err, file) => {

//         if(!file || file.length === 0){
//             return res.status(404).json({
//                 err : "No file exists"
//             });
//         }
//         return res.json(file);
//     });

// }
//To get all the files
//  exports.getFileName = (req, res) => {
//      gfs.files.find().toArray((err, files) => {
//          if(!files || files.length === 0){
//              return res.status(404).json({
//                  err : "No files exists"
//              })
//          }
//          return res.json(files);
//      });
//  }

        exports.deleteFile = (req,res) => {
            console.log("req.params.filenameDelete", req.params.filename);
            gfs.remove({filename : req.params.filename, root: "uploads"}, (err, gridstore) => {
                console.log("Delete-----------------------------------------------")
                if(err){
                    return res.status(404).json({err : err});
                }
            });
            res.send("Deleted");
        }
        
//Multer is used to handle multipart/formdata , primiraly used for uploading files(Stores in folders not in mongo).
//GridFs enables us to store files to mongoDB which are greater than the size of 16MB. It store files in form of chunks (255kB).
//multer-gridfs-store provides storage engine for multer to store files to db.
//gridfs-stream --- Easily stream files to and from MongoDB GridFS.
//StorageEngine decides how file is stored.

  













































