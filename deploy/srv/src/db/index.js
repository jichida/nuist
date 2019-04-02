const db = require('./models.js');
const dbs ={
  'product':{
    urlname:'/product',
    schema:db.ProductSchema,
    collectionname:'product',
  },
  'video':{
    urlname:'/video',
    schema:db.VideoSchema,
    collectionname:'video',
  },
  'onlineresearch':{
    urlname:'/onlineresearch',
    schema:db.OnlineResearchSchema,
    collectionname:'onlineresearch',
  },
  'systemconfig':{
    urlname:'/systemconfig',
    schema:db.SystemConfigSchema,
    collectionname:'systemconfig',
  },
  'device':{
    urlname:'/device',
    schema:db.DeviceSchema,
    collectionname:'device',
  },
  'viewtype':{
    urlname:'/viewtype',
    schema:db.ViewTypeSchema,
    collectionname:'viewtype',
  },
  'gateway':{
    urlname:'/gateway',
    schema:db.GatewaySchema,
    collectionname:'gateway',
  },
  'gatewaygroup':{
    urlname:'/gatewaygroup',
    schema:db.GatewayGroupSchema,
    collectionname:'gatewaygroup',
  },
  'user':{
    urlname:'/user',
    schema:db.UserSchema,
    collectionname:'user',
  },
  'permission':{
    urlname:'/permission',
    schema:db.PermissionSchema,
    collectionname:'permission',
  },
  'realtimealarmraw':{
    urlname:'/realtimealarmraw',
    schema:db.RealtimeAlarmRawSchema,
    collectionname:'realtimealarmraw',
  },
  'historydevice':{
    urlname:'/historydevice',
    schema:db.HistoryDeviceSchema,
    collectionname:'historydevice',
  },
  'alarmrule':{
    urlname:'/alarmrule',
    schema:db.AlarmRuleSchema,
    collectionname:'alarmrule',
  },
};

module.exports= dbs;
