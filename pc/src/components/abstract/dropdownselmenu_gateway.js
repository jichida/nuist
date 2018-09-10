import React from 'react';
// import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import Menu from 'antd/lib/menu';
// const SubMenu = Menu.SubMenu;

const getMenu = ({indexgatewayid,devicelist,gateways,devices,onMenuClick} )=>{
  return  (
    <Menu onClick={onMenuClick}>
      {
        lodashmap(gateways,(gateway,gid)=>{
            return (<Menu.Item key={gid}>{lodashget(gateway,'name','')}</Menu.Item>);
        })
      }
    </Menu>
  );
}


export default getMenu;
