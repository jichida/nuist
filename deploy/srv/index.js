const srvhttp = require('./src/srvhttp.js');
const srvwebsocket = require('./src/srvws.js');
const srvsystem = require('./src/srvsystem.js');
const config = require('./src/config');
const mongoose     = require('mongoose');

const debugapp = require('debug')('appsrv:index');
// const utilposition = require('./src/handler/common/util_position');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });

debugapp(`rooturl:${config.rooturl},mongodburl:${config.mongodburl}`);
debugapp(`issmsdebug:${config.issmsdebug},listenport:${config.listenport}`);

srvsystem.job();
srvwebsocket.startsrv(srvhttp.startsrv());
