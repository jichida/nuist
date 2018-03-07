const redis = require('./src/redis/index.js');
const _ = require('lodash');
const config = require('./src/config');

const publishdata = require('./src/publishdata');

const deviceids = [
  'NJ001',
  'LH001',
  'NODE1',
  'CZ001',
  'CC001',
  'SH001',
  'SH003'
];

let i = 0;
const startsrv = ()=>{
  i = i + 1;
  i = i%deviceids.length;
  const devicedata = publishdata.getpublishdata_device(deviceids[i]);
  console.log(devicedata);
  redis.publish('nuistiotdata_realtimedata',devicedata);
}

setInterval(()=>{
  startsrv();
},10000);
// let isstop = false;
// while(!isstop){
//   startsrv();
//   sleep(5000);
// }
//
//
// process.on('SIGINT', () => {
//    isstop = true;
// });
