import { fetchJson } from '../../util/fetch.js';
import config from '../../env/config';
import _ from 'lodash';

// "temperature" : 17,
// "rainfall" : 876,
// "humidity" : 82,
// "windspeed" : 1,
// "winddirection" : 254,
// "pressure" : 23,
// "datatime" : "2018-04-04 17:42:05"
const getOptions = (props)=>{
  console.log(props);
  let json = [];
  const {fieldsall} = props;
  _.map(fieldsall,(v)=>{
    json.push({
      label:v.showname,
      value:v.name
    });
  });

   let options = [];
    _.map(json,(v)=>{
      options.push({
        label:v.label,
        value:v.value
      });
    });
    return (input,callback) => {
      callback(null, { options: options ,complete: true});
    };
}

export {getOptions};
