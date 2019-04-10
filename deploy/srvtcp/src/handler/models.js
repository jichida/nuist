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

//视图类型
const ViewTypeSchema = new Schema({
  name:String,
  iconurl_normal:String,
  iconurl_alarm:String,
  iconurl_error:String,
  fieldsall:[
    {
      name:String,
      offset:Number,
      length:Number,
      showname:String,
      iconurl:String,
      unit:String,
      ftype:String
    }
  ],
  fieldslist_brief:[],
  fieldslist_detail:[],
  fieldslist_history:[],

}, { strict: false });
ViewTypeSchema.plugin(mongoosePaginate);
const ViewTypeModel =mongoose.model('viewtype',  ViewTypeSchema);

//设备/节点
const DeviceSchema = new Schema({
  viewtype:{ type: Schema.Types.ObjectId, ref: 'viewtype' },
}, { strict: false });
DeviceSchema.plugin(mongoosePaginate);
const DeviceModel =mongoose.model('device',  DeviceSchema);

exports.RainfalldatahistorySchema = RainfalldatahistorySchema;
exports.DeviceSchema = DeviceSchema;
exports.ViewTypeSchema = ViewTypeSchema;

exports.RainfalldatahistoryModel = RainfalldatahistoryModel;
exports.DeviceModel = DeviceModel;
exports.ViewTypeModel = ViewTypeModel;
