import React  from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';

import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import DeviceIcon from 'material-ui/svg-icons/device/devices';//节点
import DeviceGroupIcon from 'material-ui/svg-icons/action/list';//节点分组
import UserIcon from 'material-ui/svg-icons/action/account-circle';//用户
import ProductIcon from 'material-ui/svg-icons/action/dns';//产品
import OnlineResearchIcon from 'material-ui/svg-icons/social/poll';//在线调查
import PermissionIcon from 'material-ui/svg-icons/action/fingerprint';//权限
import RoleIcon from 'material-ui/svg-icons/action/account-box';//角色
import RealtimeAlarmRawIcon from 'material-ui/svg-icons/action/alarm';//报警
import HistoryDeviceIcon from 'material-ui/svg-icons/action/history';//历史节点数据

// ic_history

export default [
        { name: 'systemconfig', icon: <SystemconfigIcon /> ,adminonly:true},
        { name: 'product', icon: <ProductIcon /> ,adminonly:true},
        { name: 'onlineresearch', icon: <OnlineResearchIcon /> ,adminonly:true},
        { name: 'device', icon: <DeviceIcon />,adminonly:false },
        { name: 'devicegroup', icon: <DeviceGroupIcon /> ,adminonly:false},
        { name: 'user', icon: <UserIcon /> ,adminonly:true},
        { name: 'role', icon: <RoleIcon /> ,adminonly:true},
        // { name: 'permission', icon: <PermissionIcon /> ,adminonly:true},
        { name: 'realtimealarmraw', icon: <RealtimeAlarmRawIcon /> ,adminonly:false},
        { name: 'historydevice', icon: <HistoryDeviceIcon /> ,adminonly:false},
];
