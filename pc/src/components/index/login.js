import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  login_request,
  logout_request,
  set_weui,
  set_uiapp,
} from '../../actions';
import "./login.css";

export class PageForm extends React.Component {
    render(){
        const { handleSubmit,onClickLogin,} = this.props;
        return (
          <Form
  						className="loginForm"
  						onSubmit={handleSubmit(onClickLogin)}
  						>
                <div className="left_box">
                    <div className="login_box">
                        <label>
                          <span>账号</span>
                          <Field
                              name="username"
                              id="username"
                              component="input"
                              placeholder="输入账号"
                              type="text"
                              className="login_input"
                          />
                        </label>
                        <label>
                          <span>密码</span>
                          <Field
                              name="password"
                              id="password"
                              component="input"
                              placeholder="输入密码"
                              type="password"
                              className="login_input"
                          />
                        </label>
                    </div>
                    <span
                      className="btn_button"
                    onClick={handleSubmit(onClickLogin)}>立即登录</span>
                </div>
            </Form>
        )
    }
}

PageForm = reduxForm({
    form: 'LoginPageForm'
})(PageForm);

class Page extends React.Component {
  onClickLogin = (values)=>{
      const payload = {
          username:values.username,
          password:values.password,
      };
      //<----验证-----
      let texterr;
      if(!payload.username){
        texterr = '用户名不能为空';
      }
      if(!texterr){
        if(!payload.password){
          texterr = '密码不能为空';
        }
      }
      if(!!texterr){
        this.props.dispatch(set_weui({
          toast:{
            text:texterr,
            type:'warning'
        }
        }));
        return;
      }
      //<----验证结束-----
      console.log(payload);
      this.props.dispatch(login_request(payload));
  }
  onClickLogout = ()=>{
    this.props.dispatch(logout_request({}));
  }
  onClickChangePwd = ()=>{
    this.props.dispatch(set_uiapp({ispopuserinfo:false,ispoppwd:true}));
  }
  render() {
    const {userlogin} = this.props;
    const {loginsuccess,username} = userlogin;
    if(!loginsuccess){
      return (
        <PageForm onClickLogin={this.onClickLogin}/>
      );
    }
    return (<div className="xjl_loginh">
	<div className="xjl_login">
      <p>欢迎您,{username}</p>
	  </div>
      <div className="xjl_loginbtn">
         <span onClick={this.onClickChangePwd}>修改密码</span>
	       <span onClick={this.onClickLogout}>退出登录</span>
      </div>
	  </div>)
	  ;
  }
}

const data = ({userlogin}) => { return {userlogin}; }
Page = connect(data)(Page);

export default Page;
