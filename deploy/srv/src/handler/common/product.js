const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');

exports.getproductlist = (actiondata,ctx,callback)=>{
  const productModel = DBModels.ProductModel;
  const queryexec = productModel.find({isenabled:true}).select().lean();
  queryexec.exec((err,list)=>{
    if(!err && !!list){
        callback({
          cmd:'getproductlist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getproductlist'}
        });
      }
  });
};



exports.getproductdetail = (actiondata,ctx,callback)=>{
  const productModel = DBModels.ProductModel;
};
