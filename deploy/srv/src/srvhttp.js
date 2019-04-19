const express = require('express');
const app = express();
const path = require('path');
const winston = require('./log/log.js');
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const config = require('./config');
const routerindex = require("./router/index.js");
const upload = require('jquery-file-upload-middleware');
const uuid = require('uuid');
const _  = require('lodash');
const expressLayouts = require('express-ejs-layouts');

let startsrv = ()=>{
  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');
  app.use(expressLayouts);

  let logdir = path.join(__dirname,config.publishlog);
  // console.log("static test:" + logdir);
  app.use('/log', express.static(logdir));

  let admindir = path.join(__dirname,config.publishdiradmin);
  console.log("static admin:" + admindir);
  app.use('/admin', express.static(admindir));

  let uploaddir = path.join(__dirname,'./router',config.uploaddir);
  //console.log("static upload:" + uploaddir);
  app.use(config.uploadurl, express.static(uploaddir));


  //console.log('uploadurl:' + config.uploadurl);
  //console.log('uploaddir:' + uploaddir);


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });

  app.use((req, res, next)=> {
      //console.log('req.url:' + req.url);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });

  upload.configure({
    uploadDir: uploaddir,
    uploadUrl: config.uploadurl,
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'POST'
    },
    imageVersions: {// apt-get install imagemagick
      thumbnail: {
        width: 300,
        height: 300
      }
    }
  });

  upload.on("begin", (fileInfo)=> {
    let ext = 'jpg';
    let sz = _.split(fileInfo.type, '/');
    if(sz.length > 1){
      ext = sz[sz.length - 1];
    }
    fileInfo.name = `${uuid.v4()}.${ext}`;
    //console.log(`开始上传文件:${JSON.stringify(fileInfo)}`);
  });

  upload.on('error', function (e, req, res) {
        //console.log(e.message);
    });
  app.use('/uploadavatar',upload.fileHandler());



  routerindex.startrouter(app);

  http.listen(config.listenport, ()=>{
    //console.log('listening on *:' + config.listenport);
    winston.initLog();
    winston.getlog().info(`appversion:${config.appversion}`);
  });

  return http;
};

exports.startsrv = startsrv;
