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
  const {allowviewtypes,list} = payload;
  const {result,entities} = normalize({list}, devicesSchma);
  let viewtypes = {};
  let allowviewtypeids = [];
  const device = lodashget(entities,'device',{});
  const gateway = lodashget(entities,'gateway',{});
  for(let i = 0 ;i < allowviewtypes.length; i++){
    const viewtype = allowviewtypes[i];
    let devicetypenew = {};
    const {fieldsall,...rest} = viewtype;
    let fields = {};
    lodashmap(fieldsall,(v)=>{
      fields[v.name] = {
        showname:v.showname,
        ftype:v.ftype,
        unit:lodashget(v,'unit','')
      };
    })
    devicetypenew = {fields,...rest};
    viewtypes[viewtype._id] = devicetypenew;
    allowviewtypeids.push(viewtype._id);
  }



  return {
    viewtypes,
    allowviewtypeids,
    devicelist:result.list,
    devices:device,
    gateways:gateway
  };
};


export {
  normalizrdevices,
};
