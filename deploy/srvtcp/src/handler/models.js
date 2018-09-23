const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
const RainfalldatahistorySchema = new Schema({
  timestamp:Number,
  gwdevicekey:String,
  gwid:String,
  deviceid:String,
  rainfallprev1hour:Number,//上一小时的值
  rainfallraw:Number,//当前原始值
  rainfall:Number,//计算出来的最终值
  updatetime:String,
  linkid:{ type: Schema.Types.ObjectId, ref: 'rainfalldatahistory' },
}, { strict: false });
RainfalldatahistorySchema.plugin(mongoosePaginate);
const RainfalldatahistoryModel =mongoose.model('rainfalldatahistory',  RainfalldatahistorySchema);


exports.RainfalldatahistorySchema = RainfalldatahistorySchema;

exports.RainfalldatahistoryModel = RainfalldatahistoryModel;
