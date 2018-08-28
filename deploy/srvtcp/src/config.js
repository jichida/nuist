const config =  {
  appversion:'1.0.0(build0828)',
  logdir:process.env.logdir ||'../../dist/log',
  listenport:process.env.listenport ||50000,
  mongodburl:process.env.MONGO_URL || 'mongodb://dabauser:daba159@api.nuistiot.com/daba'//'mongodb://dabauser:daba159@api.nuistiot.com/daba',
};



module.exports = config;
