const config =  {
  appversion:'1.0.1(build217)',
  secretkey:'dabakey',
  listenport:process.env.listenport ||6011,
  rooturl:process.env.rooturl || 'http://api.nuistiot.com',
  issmsdebug:process.env.issmsdebug || false,
  isredissubscriber:process.env.isredissubscriber==='true'?true:false,
  publishdirtest:'../../../bms/test/build',
  publishdirapp:'../../../bms/app/build',
  publishdirpc:'../../../dist/pc/build',
  publishdiradmin:'../../dist/admin',
  publishlog:'../../log',
  uploaddir:'../uploader',
  uploadurl:'/uploader',
  jpush_appkey:'630950d8101fe73d19d64aaf',
  jpush_mastersecret:'dd52bf9de919a2a53441fce3',
  srvredis:{
    host:process.env.srvredis_host||'api.nuistiot.com',
    port: process.env.srvredis_port|| 6379,
  },
  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  pushdevicetopic:'pushdevicet',
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  mongodburl:process.env.MONGO_URL || 'mongodb://dabauser:daba159@api.nuistiot.com/daba'//'mongodb://dabauser:daba159@api.nuistiot.com/daba',
};



module.exports = config;
