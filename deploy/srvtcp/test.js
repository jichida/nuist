const config = require('./src/config');
const debug = require('debug')('srvtcp:app');
const mongoose     = require('mongoose');
// const dbsync = require('./src/dbsync/index');
const getbuf = require('./src/handler/tcpsrv/protocol');
debug(config);
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    mongos:config.mongos,

    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
});

// dbsync({"gwid" : "0001","deviceid" : "8B"},(err,result)=>{
//   debug(result);
// })
// const bodybuf6c = Buffer.from('427e000b7d3100006c00000033818600002b313833322e39382b343932332e37330301020304050607000102030001020377161b080001','hex');
// getbuf({cmd:0x02,bodybuf:bodybuf6c,gwid:`0001`},(result)=>{
//   debug(`-----6C------`);
//   debug(result);
// })

//01节点
const bodybuf01 = Buffer.from('427e000b7d310000010000003381860000c70a5d0b100b3b0a2901ed032807e4070c5e4b4504050607f703004900001d00bf15eb080001','hex');
getbuf({cmd:0x02,bodybuf:bodybuf01,gwid:`0001`},(err,result)=>{
  debug(`-----01------`);
  debug(result);
})
