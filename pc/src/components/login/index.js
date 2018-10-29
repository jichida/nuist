import React from 'react';
import "./index.css";
// import Header from "../header";
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  login_request,
  logout_request,
  set_weui,
  set_uiapp,
} from '../../actions';

class PageForm extends React.Component {
    render(){
        const { handleSubmit,onClickLogin} = this.props;
        return (
          <Form
  						className="login_boder"
  						onSubmit={handleSubmit(onClickLogin)}
  						>
              <div className="login_padding">
                   <h2>用户名</h2>
                   <label>
                          <Field
                              name="username"
                              id="username"
                              component="input"
                              placeholder="输入账号"
                              type="text"
                              className="login_input"
                          />
                          </label>
                          <h2>密码</h2>
                         <label>
                          <Field
                              name="password"
                              id="password"
                              component="input"
                              placeholder="输入密码"
                              type="password"
                              className="login_input"
                          />
                        </label>
                        <div className="rem_sub">
                           <span onClick={handleSubmit(onClickLogin)}>登录</span>
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
  componentWillReceiveProps (nextProps) {
      console.log(nextProps);
      if(nextProps.loginsuccess && !this.props.loginsuccess){
          console.log("------->" + JSON.stringify(this.props.location));
          //search:?next=/devicelist
          var fdStart = this.props.location.search.indexOf("?next=");
          if(fdStart === 0){
              const redirectRoute = this.props.location.search.substring(6);
              this.props.history.replace(redirectRoute);
          }
          else{
              this.props.history.replace('/');
          }
          return;
      }
  }
  onClickReturn =()=>{
      this.props.history.goBack();
  }

  componentWillUnmount(){
      // this.props.dispatch(set_weui({
      //     loading : {
      //         show : false
      //     },
      // }));
  }

  onClickLogin = (values)=>{
      let payload = {
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
      // this.props.history.push("./");
  }
    render() {
        return (<div>
            <div className="login_bg"><img src="images/dl1.jpg" alt=''/></div>
            <div className="xsqbt"><img src="images/dl1.png" alt=''/></div>
            <div className="login_m">
              <PageForm onClickLogin={this.onClickLogin}/>
            </div>
            </div>
    );
  }
}

const data = ({userlogin}) => { return {...userlogin}; }
Page = connect(data)(Page);

export default Page;
