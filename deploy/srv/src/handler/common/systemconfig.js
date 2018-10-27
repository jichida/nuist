const DBModels = require('../../db/models.js');
const winston = require('../../log/log.js');
const _ = require('lodash');
const config = require('../../config.js');

const defaultwindgradesettings = [
  {
    grade:0,
    min:0,
    max:0.2,
  },
  {
    grade:1,
    min:0.3,
    max:1.5,
  },
  {
    grade:2,
    min:1.6,
    max:3.3,
  },
  {
    grade:3,
    min:3.4,
    max:5.4,
  },
  {
    grade:4,
    min:5.5,
    max:7.9,
  },
  {
    grade:5,
    min:8.0,
    max:10.7,
  },
  {
    grade:6,
    min:10.8,
    max:13.8,
  },
  {
    grade:7,
    min:13.9,
    max:17.1,
  },
  {
    grade:8,
    min:17.2,
    max:20.7,
  },
  {
    grade:9,
    min:20.8,
    max:24.4,
  },
  {
    grade:10,
    min:24.5,
    max:28.4,
  },
  {
    grade:11,
    min:28.5,
    max:32.6,
  },
  {
    grade:12,
    min:32.7,
    max:100,
  }
]

/*
输入参数：系统配置
输出参数：风力的配置
*/
exports.getsystemconfig = (actiondata,ctx,callbackfn)=>{
    const dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({}).lean().exec((err, systemconfig)=> {
        if(!err && !!systemconfig){
            callbackfn({
              cmd:'getsystemconfig_result',
              payload:{
                SettingOfflineMinutes:_.get(systemconfig,'SettingOfflineMinutes',20),
                bannerproducturls:_.get(systemconfig,'bannerproducturls',[]),
                windgradesettings:_.get(systemconfig,'windgradesettings',defaultwindgradesettings)
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
