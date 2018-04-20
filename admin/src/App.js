// import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource ,Delete} from 'admin-on-rest';
import themeReducer from './themeReducer';
import authClient from './authClient';

// import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
import Login from './Login';
import Layout from './Layout';
import Menu from './menu/Menu';
//import { Dashboard } from './dashboard';
import CustomRoutes from './routes';
import translations from './i18n';
import restClient from './restClient';
import singledocumentpage from './components/singledocumentpage/reducer';
import menu from './menu/reducer';

import {SystemconfigList} from './components/systemconfig/index.js';
import {ProductlistCreate,ProductlistList,ProductlistEdit} from './components/product/index.js';
import {OnlineResearchCreate,OnlineResearchEdit,OnlineResearchList} from './components/onlineresearch/index.js';
import {GatewayGroupCreate,GatewayGroupList,GatewayGroupEdit} from './components/gatewaygroups/index.js';
import {DeviceCreate,DeviceList,DeviceEdit} from './components/devices/index.js';
import {GatewayCreate,GatewayList,GatewayEdit} from './components/gateways/index.js';
import {ViewTypeCreate,ViewTypeList,ViewTypeEdit} from './components/viewtype/index.js';
import {RealtimeAlarmRawList,RealtimeAlarmRawShow} from './components/realtimealarmraws/index.js';
import {UserCreate,UserList,UserEdit} from './components/users/index.js';
import {PermissionCreate,PermissionList,PermissionEdit} from './components/permissions/index.js';
import {RoleCreate,RoleList,RoleEdit} from './components/roles/index.js';
import {HistoryDeviceList,HistoryDeviceShow} from './components/historydevice/index.js';
// import {ProductlistCreate,ProductlistList,ProductlistEdit} from './components/product/index.js';


import systemconfigreducer from './components/systemconfig/reducer';

class App extends Component {

    render() {
        return (
            <Admin
                title="大坝监控平台"
                restClient={restClient}
                customReducers={{
                  theme:themeReducer,
                  systemconfig:systemconfigreducer,
                  singledocumentpage,
                  menu
                 }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="cn"
                messages={translations}
            >
            {
              permissions => {
                return [
                    <Resource name="systemconfig" list={SystemconfigList} />,
                    <Resource name="product" list={ProductlistList} edit={ProductlistEdit} create={ProductlistCreate}  remove={Delete} />,
                    <Resource name="onlineresearch" list={OnlineResearchList} edit={OnlineResearchEdit} create={OnlineResearchCreate}  remove={Delete} />,
                    <Resource name="gatewaygroup" list={GatewayGroupList} edit={GatewayGroupEdit} create={GatewayGroupCreate}  remove={Delete} />,
                    <Resource name="device" list={DeviceList} edit={DeviceEdit} create={DeviceCreate}  remove={Delete} />,
                    <Resource name="gateway" list={GatewayList} edit={GatewayEdit} create={GatewayCreate}  remove={Delete} />,
                    <Resource name="viewtype" list={ViewTypeList} edit={ViewTypeEdit} create={ViewTypeCreate}  remove={Delete} />,
                    <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />,
                    <Resource name="role" list={RoleList} edit={RoleEdit} create={RoleCreate}  remove={Delete} />,
                    <Resource name="permission" list={PermissionList} edit={PermissionEdit} create={PermissionCreate}  remove={Delete} />,
                    <Resource name="realtimealarmraw" list={RealtimeAlarmRawList} show={RealtimeAlarmRawShow} />,
                    <Resource name="historydevice" list={HistoryDeviceList} show={HistoryDeviceShow} />,
                  ];
                }
            }
            </Admin>
        );
    }
}

export default App;
