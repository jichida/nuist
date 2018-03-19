const config =  {
  logdir:process.env.logdir ||'../../dist/log',
  listenport:process.env.listenport ||50000,
  mongodburl:process.env.MONGO_URL || 'mongodb://dabauser:daba159@api.nuistiot.com/daba'//'mongodb://dabauser:daba159@api.nuistiot.com/daba',
};



module.exports = config;
