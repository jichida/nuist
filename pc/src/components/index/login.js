import React from 'react';
// import { Field, reduxForm, Form, formValueSelector  } from 'redux-form';
import "./login.css";

export class PageForm extends React.Component {
    render(){
        // const { handleSubmit,onClickLogin,pristine,submitting } = this.props;
        return (
            <div className="loginForm">
                <div className="li"><input type="text" placeholder="请输入您的帐号" /></div>
                <div className="li"><input type="text" placeholder="请输入您的密码" /></div>
                <div className="li submitBtn"><button>登录</button></div>
            </div>
        )
    }
}

class App extends React.Component {
  onClickLogin = (values)=>{
      // let payload = {
      //     username:values.phonenumber,
      //     password:values.password,
      // };
  }
  render() {
    return (
      <div className="loginPage">
        <div className="tit">管理员登录</div>
        <div className="loginform">
			     <PageForm onClickLogin={this.onClickLogin}/>
        </div>
      </div>
    );
  }
}

export default App;
