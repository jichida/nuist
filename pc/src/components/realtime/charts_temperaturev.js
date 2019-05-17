import React from "react";
import lodashget from 'lodash.get';
// import Progress  from 'antd/lib/progress';

const TempvChartCtrl = (props)=>{
  const {curdevice,fieldname,fieldsprops,index} = props;
  let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
  if(typeof showvalue === 'number'){
    showvalue = showvalue.toFixed(2);
  }
  return (
    <div className={`chartli chart${index}`}>
    <span>这是一个温度控件,加图片显示文字{`${showvalue}`}</span>
    <span>{`${fieldsprops.showname}`}</span>
    </div>
  )
}

export default TempvChartCtrl;
