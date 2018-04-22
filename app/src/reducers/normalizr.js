import { normalize, schema } from 'normalizr';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

const gateway = new schema.Entity('gateway',{},{
  idAttribute: '_id',
});

const device = new schema.Entity('device', {
  gatewayid:gateway
},{idAttribute: '_id'});



// const gatewaygroup = new
const devicesSchma = {list:[device]};

const normalizrdevices=(payload)=>{
  const {viewtype,list} = payload;
  const {result,entities} = normalize({list}, devicesSchma);
  let devicetypenew = {};
  const device = lodashget(entities,'device',{});
  const gateway = lodashget(entities,'gateway',{});
  const {fieldsall,...rest} = viewtype;
  let fields = {};
  lodashmap(fieldsall,(v)=>{
    fields[v.name] = {
      showname:v.showname,
      iconurl:v.iconurl,
      unit:lodashget(v,'unit','')
    };
  })
  devicetypenew = {fields,...rest};


  return {
    viewtype:devicetypenew,
    devicelist:result.list,
    devices:device,
    gateways:gateway
  };
};


export {
  normalizrdevices,
};
