import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    logout_result,
    saveusersettings_result,

} from '../actions';
import config from '../env/config';

const initial = {
  userlogin:{
    loginsuccess: false,
    username: '',
    token: '',
    avatar : "",
    usersettings : {
      indexgatewayid:'',
      indexdeviceid:'',
      warninglevel:'',
      subscriberdeviceids : []
    },
    role:'admin'//operator
  },
};

const userlogin = createReducer({
  [saveusersettings_result]:(state,payload)=>{
    return { ...state, ...payload};
  },
  [logout_result]: (state, payload) => {
    localStorage.removeItem(`nuist_${config.softmode}_token`);
    return { ...initial.userlogin};
  },
  [login_result]: (state, payload) => {
    // localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload};
  },
}, initial.userlogin);

export default userlogin;
