const _ = require('lodash');
const DBModels = require('../handler/models.js');
const debug = require('debug')('srvtcp:app');

const getdeviceviewtype = ({gwid,deviceid},callbackfn)=>{
  //从deviceid中获取到viewtype
  const query = {
    gwid,
    DeviceId:deviceid
  };
  debug(query);
  const dbModel = DBModels.DeviceModel;
  dbModel.findOne(query,{viewtype:1}).populate([
     {
        path:'viewtype',
        model: 'viewtype',
      }
  ]).lean().exec((err, device)=> {
    debug(err);
    debug(device);
    let result = [];
    if(!err && !!device){
        const viewtype = _.get(device,'viewtype');
        if(!!viewtype){
          result = _.get(viewtype,'fieldsall',[]);
        }
      }
      callbackfn(err,result);
  });
}

module.exports = getdeviceviewtype;
