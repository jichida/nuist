const mongoose     = require('mongoose');
const dbs = require('../db/index.js');
const middlewareauth = require('./middlewareauth.js');
const _ = require('lodash');
const adminauth = require('./handler/adminauth.js');
const curd = require('./handler/curd.js');
const getlist = require('./handler/getlist.js');
const systemloadsave = require('./handler/systemloadsave.js');

const startmodule = (app)=>{

  app.post('/adminauth/v1',adminauth);

  _.map(dbs,(schmodel,keyname)=>{
      const urlname = `/adminapi/v1${schmodel.urlname}`;
      //console.log(`urlname:${urlname}`);
      app.post(urlname,middlewareauth,curd(schmodel));
      app.get(urlname,middlewareauth,curd(schmodel));
      app.put(urlname,middlewareauth,curd(schmodel));
      app.delete(urlname,middlewareauth,curd(schmodel));
      app.options(urlname,middlewareauth,curd(schmodel));
      const customurlname = `/admincustomapi/v1${schmodel.urlname}`;
      app.post(customurlname,middlewareauth,getlist(schmodel));
  });

  app.post('/admincustomapi/v1/systemload',middlewareauth,systemloadsave);
  app.post('/admincustomapi/v1/systemsave',middlewareauth,systemloadsave);

};

module.exports=  startmodule;
