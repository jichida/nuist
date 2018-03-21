import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  login_request,
  logout_request,
  set_weui
} from '../../actions';
import "./login.css";

export class PageForm extends React.Component {
    render(){
        const { handleSubmit,onClickLogin,pristine,submitting } = this.props;
        return (
          <Form
  						className="loginForm"
  						onSubmit={handleSubmit(onClickLogin)}
  						>
            <div className="loginForm">
                <div className="li">
                  <Field
      								name="username"
      								id="username"
                      component="input"
      								placeholder="请输入您的账号"
      								type="text"
      						/>

                </div>
                <div className="li">
                  <Field
      								name="password"
      								id="password"
                      component="input"
      								placeholder="请输入您的密码"
      								type="password"
      						/>
                </div>
                <div className="li submitBtn">
                  <button disabled={pristine || submitting}
                  onClick={handleSubmit(onClickLogin)}>登录</button>
                </div>
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
  render() {
    const {userlogin} = this.props;
    const {loginsuccess,username} = userlogin;
    if(!loginsuccess){
      return (
        <div className="loginPage">
          <div className="tit">用户登录</div>
          <div className="loginform">
             <PageForm onClickLogin={this.onClickLogin}/>
          </div>
        </div>
      );
    }
    return (<div>
      <span>欢迎您,{username}</span>
      <div onClick={this.onClickLogout}>退出登录</div>
      </div>);
  }
}

const data = ({userlogin}) => { return {userlogin}; }
Page = connect(data)(Page);

export default Page;
