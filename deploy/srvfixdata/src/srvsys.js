const _ = require('lodash');
const DBModels = require('../src/handler/models.js');
const debug = require('debug')('srvfixdata:start');
const winston = require('./log/log.js');
const async = require('async');
const config = require('./config');
const moment = require('moment');
const startfix69 = require('./fix/index69');


const start = (callbackfn)=>{
  winston.getlog().info(`开始执行`);
  debug(`开始执行`)
  let fnsz = [];

  fnsz.push((callbackfn)=>{
    startfix69(callbackfn);
  });


  async.parallelLimit(fnsz,1,(err,result)=>{
    debug(`执行完毕`)
    winston.getlog().info(`执行完毕`);
  });
};


module.exports= start;
