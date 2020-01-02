import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  login_request,
  set_weui
} from '../../actions';
import "./style.css";
import LoginBg from "../../img/loginbg.png";
import Img1 from "../../img/1.png";
import Img2 from "../../img/2.png";
import Img3 from "../../img/23.png";
// import Header from "../header/page.js";

let resizetimecontent;

class PageForm extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
          innerHeight : window.innerHeight,
          innerWidth : window.innerWidth
        };
    }

	componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth : window.innerWidth
            });
        },10)
    }

  	render() {
      const { handleSubmit,onClickLogin,pristine,submitting } = this.props;
    	return (
				<Form
						className="loginForm"
						onSubmit={handleSubmit(onClickLogin)}
						>
      		<div
      			className="loginPage"
      			style={{
      				width: "100%",
      				height: `${this.state.innerHeight}px`,
      				overflow: "hidden"
      			}}
      			>
        		<img alt="" src={LoginBg} className="loginbg" />
        		<div className="loginForm">
        			<div className="tit">
        				<p className="t">大坝智能监控系统</p>
        				<p className="i">Intelligent monitoring system for dam</p>
        			</div>
					<div className="li">
						<img alt="" src={Img1} />
						<Field
								name="username"
								id="username"
                component="input"
								placeholder="请输入您的账号"
								type="text"
						/>
					</div>
					<div className="li">
						<img alt="" src={Img2} />
						<Field
								name="password"
								id="password"
                component="input"
								placeholder="请输入您的密码"
								type="password"
						/>
					</div>
					<div className="butn">
						<button disabled={pristine || submitting}
            onClick={handleSubmit(onClickLogin)}>登录</button>
					</div>
          <div className="butn">
						<button disabled={pristine || submitting}
            onClick={()=>{this.props.history.replace('/register');}}>注册</button>
					</div>
        		</div>
      		</div>
					</Form>
    	);
  	}
}

PageForm = reduxForm({
    form: 'LoginPageForm'
})(PageForm);



export class Page extends React.Component {
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
    render(){
        /*
        【注意】：
        加一个透明的返回按钮，把<Header history={this.props.history} title='登录'/>替换掉
        用onClick={this.props.history.goBack();} 来响应事件
        */
        return (<div>
		      <div className="pageheader login_head" onClick={()=>{
            this.props.history.goBack();
            }} >
            <span className="leftlnk">
              <img alt="" src={Img3} />
            </span>
          </div>

          <PageForm onClickLogin={this.onClickLogin} dispatch={this.props.dispatch} history={this.props.history}/>
        </div>

        );
    }
}

const data = ({userlogin}) => { return userlogin; }
Page = connect(data)(Page);

export default Page;
