const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const router = require('./router');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
require('dotenv').config();
Grid.mongo = mongoose.mongo;

//DB setup
const uri = process.env.MONGO_URL;
mongoose.connect(uri,{ useNewUrlParser : true, useCreateIndex : true });

//const conn = mongoose.createConnection(uri,{ useNewUrlParser : true, useCreateIndex : true });

//App setup
app.use(morgan('combined'));//Used for logging and it is middleware
app.use(bodyParser.json());//It is middleware
app.use(bodyParser.urlencoded({
    extended: false
    }));
   // app.use(multer().array());
app.use(cors());
app.use(methodOverride('_method'));
 router(app);

// conn.once('open', function () {
//     var gfs = Grid(conn.db);
//         gfs.collection("uploads");
//     // all set!
//   })
//   //Storage
//   var storage = new GridFsStorage({
//     url: uri,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'users'//Should match collection name
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
//   const upload = multer({ storage });

//   app.post('/uploads', upload.single("file"), (req,res) =>{
//       console.log("yeeeeeeee");
//     res.json({file: req.file});
//   });


//server setup
const port = process.env.PORT || 4111;
const server = http.createServer(app);
server.listen(port);

console.log(`Server is listening on port :`, port );
