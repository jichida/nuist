import { normalize, schema } from 'normalizr';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
// Define a users schema
const devicetype = new schema.Entity('devicetype',{},{
  idAttribute: '_id',
});

// Define your comments schema
const device = new schema.Entity('device', {
  devicetype: devicetype,
},{idAttribute: '_id'});

const devicesSchma = {list:[device]};

const normalizrdevices=(list)=>{
  const {result,entities:{device,devicetype}} = normalize({list}, devicesSchma);

  let devicetypenew = {};
  lodashmap(devicetype,(vd,k)=>{
    const {fieldsall,...rest} = vd;
    let fields = {};
    lodashmap(fieldsall,(v)=>{
      fields[v.name] = {
        showname:v.showname,
        iconurl:v.iconurl,
        unit:lodashget(v,'unit','')
      };
    })
    devicetypenew[k] = {fields,...rest};
  });
  return {
    devicelist:result.list,
    devices:device,
    devicetype:devicetypenew
  };
};


export {
  normalizrdevices,
};
