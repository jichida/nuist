import React from 'react';
// import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;

const getMenu = ({devicelist,gateways,devices,onMenuClick} )=>{
  return  (
    <Menu onClick={onMenuClick}>
      {
        lodashmap(gateways,(gateway,gid)=>{

            return (
                  <SubMenu  key={gid} title={lodashget(gateway,'name','')}>
                    {
                       lodashmap(devicelist,(did)=>{
                          const curdevice = devices[did];
                          if(curdevice.gatewayid === gid){
                            return (<Menu.Item key={did}>{lodashget(curdevice,'name','')}</Menu.Item>)
                          }
                       })
                    }
                  </SubMenu>);

        })
      }
    </Menu>
  );
}


export default getMenu;
