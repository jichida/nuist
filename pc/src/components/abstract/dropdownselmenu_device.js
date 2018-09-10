import React from 'react';
// import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import Menu from 'antd/lib/menu';
// const SubMenu = Menu.SubMenu;

const getMenu = ({indexgatewayid,devices,onMenuClick} )=>{
  return  (
    <Menu onClick={onMenuClick}>
      {
       lodashmap(devices,(curdevice)=>{
            if(curdevice.gatewayid === indexgatewayid){
              return (<Menu.Item key={curdevice._id}>{lodashget(curdevice,'name','')}</Menu.Item>)
            }
         })
      }
    </Menu>
  );
}


export default getMenu;
