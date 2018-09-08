const _  = require('lodash');
const winston = require('./log/log.js');
const config = require('./config.js');
const handleuserpc = require('./handler/pc/index.js');
const handleuserapp = require('./handler/app/index.js');
const PubSub = require('pubsub-js');
const usersubfn = require('./handler/socketsubscribe');
const getdevicesids = require('./handler/getdevicesids');
const debug = require('debug')('appsrv:srvws');
const srvsystem = require('./srvsystem.js');
const userlogin = require('./handler/common/userlogin');
const uuid = require('uuid');

const startwebsocketsrv = (http)=>{
  let io = require('socket.io')(http);

  io.on('connection', (socket)=>{
    //console.log('a user connected');

    let ctx = {
      userid:null,
      connectid:uuid.v4(),
    };//for each connection
    usersubfn(socket,ctx);
    userlogin.subscriberuser(ctx);
    srvsystem.loginuser_add(ctx.userid,ctx.connectid);


    socket.on('pc',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'pc';
      }
      // //console.log('\npc get message:' + JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      handleuserpc(socket,payload,ctx);
    });

    socket.on('app',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'app';
      }
      // //console.log('\napp get message:' + JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      handleuserapp(socket,payload,ctx);
    });


    socket.on('error',(err)=>{
      PubSub.unsubscribe( ctx.userDeviceSubscriber );
      socket.disconnect(true);
    });

    socket.on('disconnect', ()=> {
      PubSub.unsubscribe( ctx.userDeviceSubscriber );
    });
  });

};

exports.startsrv = startwebsocketsrv;
