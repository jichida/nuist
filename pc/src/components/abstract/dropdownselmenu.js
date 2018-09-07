import React from 'react';
// import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import Menu from 'antd/lib/menu';

const getMenu = ({devicelist,devices,onMenuClick} )=>{
  return  (
    <Menu onClick={onMenuClick}>
      {
        lodashmap(devicelist,(did)=>{
          const curdevice = devices[did];
          if(!!curdevice){
            return (
                  <Menu.Item key={did}>
                      {lodashget(curdevice,'name','')}
                    </Menu.Item>);
          }
        })
      }
    </Menu>
  );
}


export default getMenu;
