import React from "react";
import lodashget from 'lodash.get';
// import Progress  from 'antd/lib/progress';

const ReqvChartCtrl = (props)=>{
  const {curdevice,fieldname,fieldsprops,index} = props;
  let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
  if(typeof showvalue === 'number'){
    showvalue = showvalue.toFixed(2);
  }
  return (
    <div className={`chartli chart${index}`}>
    <div className="plbgbox">
      <span>{`${showvalue}`}</span>
      <span>{`${fieldsprops.showname}`}</span>
    </div>
    </div>
  )
}

export default ReqvChartCtrl;
