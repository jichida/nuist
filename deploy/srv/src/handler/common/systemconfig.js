const DBModels = require('../../db/models.js');
const winston = require('../../log/log.js');
const _ = require('lodash');
const config = require('../../config.js');

exports.getsystemconfig = (actiondata,ctx,callbackfn)=>{
    const dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({}).lean().exec((err, systemconfig)=> {
        if(!err && !!systemconfig){
            callbackfn({
              cmd:'getsystemconfig_result',
              payload:{
                bannerproducturls:_.get(systemconfig,'bannerproducturls',[])
              }
            });
        }
        else{
          callbackfn({
            cmd:'common_err',
            payload:{errmsg:`请联系管理员设置后台系统设置信息！`,type:'getsystemconfig'}
          });
          winston.getlog().error(`请联系管理员设置后台系统设置信息！`);
        }
    });
}
