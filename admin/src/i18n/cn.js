export default {
  pos:{
    configuration: '偏好',
    language:'语言',
    theme: {
        name: '皮肤',
        light: 'Clair',
        dark: 'Obscur',
    },
  },
  resources: {
    systemconfig:{
      name: '系统设置 |||| 系统设置',
      notification:{
        'save_success':'保存成功',
        'save_error':'保存失败'
      }
    },
    product:{
      name: '产品管理 |||| 产品管理',
    },
    onlineresearch:{
      name: '在线调查管理 |||| 在线调查管理',
    },
    device:{
      name: '节点管理 |||| 节点管理',
    },
    devicetype:{
      name: '节点类型管理 |||| 节点类型管理',
    },
    devicegroup:{
      name: '节点分组管理 |||| 节点分组管理',
      fields:{
        deviceids:'节点列表',
      }
    },
    user:{
      name: '用户管理 |||| 用户管理',
      notification:{
        resetuserpassword_differrentpwd:'两次密码必须相同',
        resetuserpassword_success:'重置密码成功',
        resetuserpassword_failed:'重置密码失败',
      }
    },
    role:{
      name: '角色管理 |||| 角色管理',
      fields:{
        organizationid:'所在组织',
      }
    },
    permission:{
      name: '权限管理 |||| 权限管理',
    },
    realtimealarmraw:{
      name:'报警管理 |||| 报警管理',
    },
    historydevice:{
      name: '节点历史数据管理 |||| 节点历史数据管理',
    },
  }
};
