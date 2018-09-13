import React  from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';

import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import DeviceIcon from 'material-ui/svg-icons/device/devices';//节点
import GatewayGroupIcon from 'material-ui/svg-icons/action/list';//节点分组
import UserIcon from 'material-ui/svg-icons/action/account-circle';//用户
import ProductIcon from 'material-ui/svg-icons/action/dns';//产品
import OnlineResearchIcon from 'material-ui/svg-icons/social/poll';//在线调查
import PermissionIcon from 'material-ui/svg-icons/action/fingerprint';//权限
import RoleIcon from 'material-ui/svg-icons/action/account-box';//角色
import RealtimeAlarmRawIcon from 'material-ui/svg-icons/action/alarm';//报警
import HistoryDeviceIcon from 'material-ui/svg-icons/action/history';//历史节点数据

// ic_history

export default [
        { name: 'systemconfig', icon: <SystemconfigIcon /> ,adminonly:false},
        { name: 'product', icon: <ProductIcon /> ,adminonly:false},
        // { name: 'onlineresearch', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'device', icon: <DeviceIcon />,adminonly:false },
        { name: 'gateway', icon: <DeviceIcon />,adminonly:false },
        { name: 'viewtype', icon: <DeviceIcon />,adminonly:false },
        { name: 'gatewaygroup', icon: <GatewayGroupIcon /> ,adminonly:false},
        { name: 'user', icon: <UserIcon /> ,adminonly:false},
        // { name: 'role', icon: <RoleIcon /> ,adminonly:false},
        // { name: 'permission', icon: <PermissionIcon /> ,adminonly:true},
        { name: 'realtimealarmraw', icon: <RealtimeAlarmRawIcon /> ,adminonly:false},
        { name: 'historydevice', icon: <HistoryDeviceIcon /> ,adminonly:false},
];
