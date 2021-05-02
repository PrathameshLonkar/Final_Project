'use strict';

//var Texts = [];
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const querystring = require('querystring');

const mustache = require('mustache');
const mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://plonkar1:prathamesh@cluster0.rfest.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express()
const port = 3000
const STATIC_DIR = 'static';
const TEMPLATES_DIR = 'templates';
//app.get('/', (req, res) => res.send('Hello World!'))

app.locals.port = port;
  app.locals.base = "localhost:3000/";
  //app.locals.model = model;
  //app.use('',express.static(STATIC_DIR));
  process.chdir(__dirname);
  app.get('/',function(req,res){
      console.log(__dirname )
  res.sendFile(__dirname +'/static' + '/home.html');
  })
  setupTemplates(app);
  setupRoutes(app);
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  });
  module.export = app;
  function setupRoutes(app) {
  const base = "localhost:3000/";
  app.get(`/text.html`, doText(app));
  app.get(`/InsertText.html`, doAddText(app));
  app.get(`/:id`, doId(app));
  //app.get(`/comp-district.html`, doCompDistrict(app));
  //app.get(`/Search-a-case.html`, doSearchCase(app));


}

function setupTemplates(app) {
    app.templates = {};
    for (let fname of fs.readdirSync(TEMPLATES_DIR)) {
      const m = fname.match(/^([\w\-]+)\.ms$/);
      if (!m) continue;
      try {
        app.templates[m[1]] =
      String(fs.readFileSync(`${TEMPLATES_DIR}/${fname}`));
      }
      catch (e) {
        console.error(`cannot read ${fname}: ${e}`);
        process.exit(1);
      }
    }
  }

function doId(app){
    return async function(req,res){
        var id = req.params.id;
        const conn = await Mongo()
        var {client,db,collection} = conn
        var result = await collection.find({'id':id});
        var Texts = await result.toArray()
        Close(client);
        var data = {}
        Texts.map(function(e){
            if(e.id == id){
               data.text = e.Text;
            }
        })
        var template = 'DisplayText';
        let model = {Data:data}  
        const html = doMustache(app, template, model);
        return res.send(html)
    }
}

function doText(app){
    return async function(req,res){
        console.log("Enteredn doText")
        return res.sendFile(__dirname +'/static' + '/text.html');
    }
    
}
var Close = async function(client){
  await client.close();
}
var Mongo = async function(){
  const client=await mongo.connect(url,MONGO_OPTIONS);
	const db=client.db("Paste");
	const collection = db.collection("data");
	
	return {client,db,collection}
	
}
var ID = function () {
    
    return '_' + Math.random().toString(36).substr(2, 9);
  };
function doAddText(app){
    return async function(req,res){
    console.log("Entered doAddText")
    var Text= req.query
    const conn = await Mongo()
    console.log(conn)
    var {client,db,collection} = conn
    var id = ID()
    //console.log(id)
    Text.id = id;
    var data = await collection.insertOne(Text);
    var result = await collection.find();
    var Texts = await result.toArray()
    console.log('This is inserted into db',Texts)
    Close(client);
    
    var template = 'DisplayId';
    let model = {Data:Texts}  
    const html = doMustache(app, template, model);
    console.log(html);
    
    return res.send(html)
   
    }
}
function doMustache(app, templateId, view) {
    //const templates = { };
      return mustache.render(app.templates[templateId], view);
    }

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};