const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const multer =  require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const crypto = require('crypto');
let url = "mongodb+srv://plonkar1:prathamesh@cluster0.rfest.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongo = require('mongodb').MongoClient;

async function doGfs(){
    console.log('entered dogfs')
    const client=await mongo.connect(url,MONGO_OPTIONS);
	const db=client.db("Paste");

    // make sure the db instance is open before passing into `Grid`
    
      var gfs = grid(db, mongo);
      //console.log('gfs:',gfs)
        return gfs;
    
}
module.exports.doGfs = doGfs;


// Create storage engine
const storage = new gridFsStorage({
    url: url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            metadata: {owner: id},
            bucketName: 'uploads'
            
          };
          console.log(fileInfo);
          resolve(fileInfo);
        });
      });
    }
  });
module.exports.storage = storage;
  const upload = multer({ storage });
  module.exports.upload = upload;
  const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };