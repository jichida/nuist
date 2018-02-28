const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
const SystemConfigSchema = new Schema({
}, { strict: false });
SystemConfigSchema.plugin(mongoosePaginate);
const SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);

//产品
const ProductSchema = new Schema({
  name:String,
  brief:String,
  picurl:String,
  picurls:[],
  picurldetail:String,
  isenabled:{ type: Boolean, default: false },
  lastupdatetime:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
}, { strict: false });
ProductSchema.plugin(mongoosePaginate);
const ProductModel =mongoose.model('product',  ProductSchema);

//在线调查
const OnlineResearchSchema = new Schema({
  name:String,
  answeroptions:[],
  researchresult:[],
  researchrecords:[],
  publishdate:{ type: String, default:moment().format('YYYY-MM-DD')},
}, { strict: false });
OnlineResearchSchema.plugin(mongoosePaginate);
const OnlineResearchModel =mongoose.model('onlineresearch',  OnlineResearchSchema);

//设备
const DeviceSchema = new Schema({
}, { strict: false });
DeviceSchema.plugin(mongoosePaginate);
const DeviceModel =mongoose.model('device',  DeviceSchema);

//设备分组
const DeviceGroupSchema = new Schema({
  name:String,
  memo:String,
  contact:String,
  deviceids:[{ type: Schema.Types.ObjectId, ref: 'device', default: [] }],
  systemflag:{ type: Schema.Types.Number,default: 0 },
});
DeviceGroupSchema.plugin(mongoosePaginate);
const DeviceGroupModel =mongoose.model('devicegroup',  DeviceGroupSchema);

//用户
const UserSchema = new Schema({
  username:String,
  passwordhash: String,
  passwordsalt: String,
  truename:String,
  memo:String,
  created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  updated_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  roleid:{ type: Schema.Types.ObjectId, ref: 'role' },
  adminflag:{ type: Schema.Types.Number,default: 0 },
  devicegroups:[{ type: Schema.Types.ObjectId, ref: 'devicegroup', default: [] }],
  devicecollections:[],
  alarmsettings:{
    warninglevel:String,//报警等级
    subscriberdeviceids:[],//订阅的设备
  }
});
UserSchema.plugin(mongoosePaginate);
const UserModel =mongoose.model('user',  UserSchema);

//权限
const PermissionSchema = new Schema({
  name:String,
  memo:String,
  type:String,//数据权限|操作权限
  datafields:[],//数据权限|操作权限
  systemflag:{ type: Schema.Types.Number,default: 0 },
});
PermissionSchema.plugin(mongoosePaginate);
const PermissionModel =mongoose.model('permission',  PermissionSchema);

//角色
const RoleSchema = new Schema({
  name:String,
  memo:String,
  permissions_opt:[{ type: Schema.Types.ObjectId, ref: 'permission', default: [] }],
  permissions_data:[{ type: Schema.Types.ObjectId, ref: 'permission', default: [] }],
});
RoleSchema.plugin(mongoosePaginate);
const RoleModel =mongoose.model('role',  RoleSchema);

//原始信息
const RealtimeAlarmRawSchema= new Schema({
}, { strict: false });
RealtimeAlarmRawSchema.plugin(mongoosePaginate);
const RealtimeAlarmRawModel =mongoose.model('realtimealarmraw',  RealtimeAlarmRawSchema);

//设备历史信息
const HistoryDeviceSchema = new Schema({
  deviceid:{ type: Schema.Types.ObjectId, ref: 'device' },
});
HistoryDeviceSchema.plugin(mongoosePaginate);
const HistoryDeviceModel =mongoose.model('historydevice',  HistoryDeviceSchema);


exports.SystemConfigSchema = SystemConfigSchema;
exports.ProductSchema = ProductSchema;
exports.OnlineResearchSchema = OnlineResearchSchema;
exports.DeviceSchema = DeviceSchema;
exports.DeviceGroupSchema = DeviceGroupSchema;
exports.UserSchema = UserSchema;
exports.PermissionSchema = PermissionSchema;
exports.RoleSchema = RoleSchema;
exports.RealtimeAlarmRawSchema = RealtimeAlarmRawSchema;
exports.HistoryDeviceSchema = HistoryDeviceSchema;

exports.SystemConfigModel = SystemConfigModel;
exports.ProductModel = ProductModel;
exports.OnlineResearchModel = OnlineResearchModel;
exports.DeviceModel = DeviceModel;
exports.DeviceGroupModel = DeviceGroupModel;
exports.UserModel = UserModel;
exports.PermissionModel = PermissionModel;
exports.RoleModel = RoleModel;
exports.RealtimeAlarmRawModel = RealtimeAlarmRawModel;
exports.HistoryDeviceModel = HistoryDeviceModel;
