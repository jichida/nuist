const moment = require('moment');
const config =  {
  mongodburl:process.env.MONGO_URL || 'mongodb://dabauser:daba159@api.nuistiot.com/daba',
  mongos:process.env.mongos==='true'?true:false,
  logdir:process.env.logdir ||'/root/nuist/deploy/dist/log',
  version:'1.0.0'
};



module.exports = config;
