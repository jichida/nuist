import React from 'react';
// import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;

const getMenu = ({devicelist,devices,onMenuClick} )=>{
  return  (
    <Menu onClick={onMenuClick}>
      {
        lodashmap(devicelist,(did)=>{
          const curdevice = devices[did];
          if(!!curdevice){
            return (
                  <SubMenu  key={did} title={lodashget(curdevice,'name','')}>
                    {
                       lodashmap(devicelist,(did)=>{
                          const curdevice = devices[did];
                          return (<Menu.Item>{lodashget(curdevice,'name','')}</Menu.Item>)
                       })
                    }
                  </SubMenu>);
          }
        })
      }
    </Menu>
  );
}


export default getMenu;
