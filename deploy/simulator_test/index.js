const redis = require('./src/redis/index.js');
const _ = require('lodash');
const config = require('./src/config');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const publishdata = require('./src/publishdata');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });

//设备/节点
const DeviceSchema = new Schema({
  gatewayid:{ type: Schema.Types.ObjectId, ref: 'gateway' },
}, { strict: false });
const DeviceModel =mongoose.model('device',  DeviceSchema);

const getdeviceids = ((callbackfn)=>{
  const deviceModel = DeviceModel;
  // console.log(`getdeviceids`);
  const queryexec = deviceModel.find({}).select({DeviceId:1}).lean().exec((err,result)=>{
    let deviceids = [];
    if(!err && !!result){
      for(let i = 0 ;i < result.length;i++){
        deviceids.push(result[i].DeviceId);
      }
    }
    callbackfn(deviceids);
  });
  // const deviceids = [
  //   'NJ001',
  //   'LH001',
  //   'NODE1',
  //   'CZ001',
  //   'CC001',
  //   'SH001',
  //   'SH003'
  // ];

});




const startsrv = ()=>{
  getdeviceids((deviceids)=>{
    for(let i = 0 ;i < deviceids.length; i++){
      const devicedata = publishdata.getpublishdata_device(deviceids[i]);
      // console.log(devicedata);
      redis.publish('nuistiotdata_realtimedata',devicedata);
    }
  });
}
startsrv();
setInterval(()=>{
  startsrv();
},60000);
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
