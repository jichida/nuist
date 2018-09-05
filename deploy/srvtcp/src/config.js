const config =  {
  appversion:'1.0.0(build0828)',
  logdir:process.env.logdir ||'../../dist/log',
  srvredis:{
    host:process.env.srvredis_host||'api.nuistiot.com',
    port: process.env.srvredis_port|| 6379,
  },
  listenport:process.env.listenport ||50000,
  mongodburl:process.env.MONGO_URL || 'mongodb://dabauser:daba159@api.nuistiot.com/daba'//'mongodb://dabauser:daba159@api.nuistiot.com/daba',
};



module.exports = config;
