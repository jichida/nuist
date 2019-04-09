const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
const SystemConfigSchema = new Schema({
  gatewaygroups4app:[{ type: Schema.Types.ObjectId, ref: 'gatewaygroup', default: [] }],
  gatewaygroups4pc:[{ type: Schema.Types.ObjectId, ref: 'gatewaygroup', default: [] }],
  viewtype:{ type: Schema.Types.ObjectId, ref: 'viewtype' },
  allowviewtypes:[{ type: Schema.Types.ObjectId, ref: 'viewtype' }],
  alarmruleid:{ type: Schema.Types.ObjectId, ref: 'alarmrule' },
  indexbannerurl:String
}, { strict: false });
SystemConfigSchema.plugin(mongoosePaginate);
const SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);

//视频
const VideoSchema = new Schema({
  name:String,
  url:String,
  gatewayid:{ type: Schema.Types.ObjectId, ref: 'gateway' },
}, { strict: false });
VideoSchema.plugin(mongoosePaginate);
const VideoModel =mongoose.model('video',  VideoSchema);

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

//设备/节点
const DeviceSchema = new Schema({
  gatewayid:{ type: Schema.Types.ObjectId, ref: 'gateway' },
  viewtype:{ type: Schema.Types.ObjectId, ref: 'viewtype' },
}, { strict: false });
DeviceSchema.plugin(mongoosePaginate);
const DeviceModel =mongoose.model('device',  DeviceSchema);

//网关
const GatewaySchema = new Schema({
  alarmruleid:{ type: Schema.Types.ObjectId, ref: 'alarmrule' },
}, { strict: false });
GatewaySchema.plugin(mongoosePaginate);
const GatewayModel =mongoose.model('gateway',  GatewaySchema);

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

//网关分组
const GatewayGroupSchema = new Schema({
  name:String,
  memo:String,
  contact:String,
  gatewayids:[{ type: Schema.Types.ObjectId, ref: 'gateway', default: [] }],
  systemflag:{ type: Schema.Types.Number,default: 0 },
}, { strict: false });
GatewayGroupSchema.plugin(mongoosePaginate);
const GatewayGroupModel =mongoose.model('gatewaygroup',  GatewayGroupSchema);

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
  viewtype:{ type: Schema.Types.ObjectId, ref: 'viewtype' },
  allowviewtypes:[{ type: Schema.Types.ObjectId, ref: 'viewtype' }],
  gatewaygroups:[{ type: Schema.Types.ObjectId, ref: 'gatewaygroup', default: [] }],
  usersettings:{
    indexdeviceid:String,
    indexgatewayid:String,
    warninglevel:String,//报警等级
    subscriberdeviceids:[],//订阅的设备
  },
  indexbannerurl:String
}, { strict: false });
UserSchema.plugin(mongoosePaginate);
const UserModel =mongoose.model('user',  UserSchema);

//权限
const PermissionSchema = new Schema({
  name:String,
  memo:String,
  type:String,//数据权限|操作权限
  datafields:[],//数据权限|操作权限
  systemflag:{ type: Schema.Types.Number,default: 0 },
}, { strict: false });
PermissionSchema.plugin(mongoosePaginate);
const PermissionModel =mongoose.model('permission',  PermissionSchema);

//角色
const RoleSchema = new Schema({
  name:String,
  memo:String,
  permissions_opt:[{ type: Schema.Types.ObjectId, ref: 'permission', default: [] }],
  permissions_data:[{ type: Schema.Types.ObjectId, ref: 'permission', default: [] }],
}, { strict: false });
RoleSchema.plugin(mongoosePaginate);
const RoleModel =mongoose.model('role',  RoleSchema);

//原始信息
const RealtimeAlarmRawSchema= new Schema({
  did:{ type: Schema.Types.ObjectId, ref: 'device' },
  gatewayid:{ type: Schema.Types.ObjectId, ref: 'gateway' },
}, { strict: false });
RealtimeAlarmRawSchema.plugin(mongoosePaginate);
const RealtimeAlarmRawModel =mongoose.model('realtimealarmraw',  RealtimeAlarmRawSchema);

//设备历史信息
const HistoryDeviceSchema = new Schema({
  gatewayid:{ type: Schema.Types.ObjectId, ref: 'gateway' },
  did:{ type: Schema.Types.ObjectId, ref: 'device' },
  viewtype:{ type: Schema.Types.ObjectId, ref: 'viewtype' },
}, { strict: false });
HistoryDeviceSchema.plugin(mongoosePaginate);
const HistoryDeviceModel =mongoose.model('historydevice',  HistoryDeviceSchema);

//报警规则
//权限
const AlarmRuleSchema = new Schema({
  name:String,
  warningrulelevel0:[
    {
       content : String,
       value : String,
       op : String,
       name : String
    }
  ],
  warningrulelevel1:[
    {
       content : String,
       value : String,
       op : String,
       name : String
    }
 ],
  warningrulelevel2:[
    {
       content : String,
       value : String,
       op : String,
       name : String
    }
 ]
}, { strict: false });
AlarmRuleSchema.plugin(mongoosePaginate);
const AlarmRuleModel =mongoose.model('alarmrule',  AlarmRuleSchema);

exports.VideoSchema = VideoSchema;
exports.SystemConfigSchema = SystemConfigSchema;
exports.ProductSchema = ProductSchema;
exports.OnlineResearchSchema = OnlineResearchSchema;
exports.DeviceSchema = DeviceSchema;
exports.GatewaySchema = GatewaySchema;
exports.ViewTypeSchema = ViewTypeSchema;
exports.GatewayGroupSchema = GatewayGroupSchema;
exports.UserSchema = UserSchema;
exports.PermissionSchema = PermissionSchema;
exports.RoleSchema = RoleSchema;
exports.RealtimeAlarmRawSchema = RealtimeAlarmRawSchema;
exports.HistoryDeviceSchema = HistoryDeviceSchema;
exports.AlarmRuleSchema = AlarmRuleSchema;

exports.VideoModel = VideoModel;
exports.SystemConfigModel = SystemConfigModel;
exports.ProductModel = ProductModel;
exports.OnlineResearchModel = OnlineResearchModel;
exports.DeviceModel = DeviceModel;
exports.GatewayModel  = GatewayModel ;
exports.ViewTypeModel  = ViewTypeModel ;
exports.GatewayGroupModel  = GatewayGroupModel;
exports.UserModel = UserModel;
exports.PermissionModel = PermissionModel;
exports.RoleModel = RoleModel;
exports.RealtimeAlarmRawModel = RealtimeAlarmRawModel;
exports.HistoryDeviceModel = HistoryDeviceModel;
exports.AlarmRuleModel = AlarmRuleModel;
