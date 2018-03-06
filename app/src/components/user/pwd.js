import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
// import { withRouter } from 'react-router-dom';
import Close from "../../img/close.png";
import {
    required,
    InputValidation,
    passwordA,
    passwordB,
    minLength6
} from "../tools/formvalidation-material-ui";

import "./style.css";
import {
    changepwd_request,
    set_uiapp
} from '../../actions';


export class PageForm extends React.Component {
    render() {
        const { handleSubmit, onClickchange, pristine, submitting } = this.props;

        return ( <
            Form className = "changepwdForm"
            onSubmit = { handleSubmit(onClickchange) } >
            <
            div >
            <
            span > 当前密码 < /span> <
            Field name = "password"
            id = "password"
            placeholder = "请输入原始密码"
            type = "password"
            component = { InputValidation }
            validate = {
                [required]
            }
            /> < /
            div > <
            div >
            <
            span > 新的密码 < /span> <
            Field name = "passwordA"
            id = "passwordA"
            placeholder = "请输入您的新密码"
            type = "password"
            component = { InputValidation }
            validate = {
                [required, passwordA, minLength6]
            }
            /> < /
            div > <
            div >
            <
            span > 确认密码 < /span> <
            Field name = "passwordB"
            id = "passwordB"
            placeholder = "请重复输入您的新密码"
            type = "password"
            component = { InputValidation }
            validate = {
                [required, passwordB, minLength6]
            }
            /> < /
            div >

            <
            div className = "submitBtn" >
            <
            span className = "btn"
            disabled = { pristine || submitting }
            onClick = { handleSubmit(onClickchange) } >
            确定 <
            /span>


            <
            /div> < /
            Form >
        )
    }
}

PageForm = reduxForm({
    form: 'changepwdPageForm'
})(PageForm);

// PageForm = withRouter(PageForm);

class App extends React.Component {

    constructor(props)  {          
        super(props);          
        this.state  =   {};
    }
    onClickClosePwd = () => {
        this.props.dispatch(set_uiapp({ ispoppwd: false }));
    }
    onClickchange = (values) => {
        this.props.dispatch(set_uiapp({ ispoppwd: false }));
        let payload = {
            password: values.password,
            passwordA: values.passwordA,
        };
        this.props.dispatch(changepwd_request(payload));
    }
    render() {
        return ( <
            div className = "changepwd" >
            <
            div className = "wamp" > < /div> <
            div className = "infocontent" >
            <
            div className = "tit" > 修改密码 < /div> <
            PageForm onClickchange = { this.onClickchange }
            /> <
            div onClick = { this.onClickClosePwd }
            className = "closediv" > < img className = "close"
            src = { Close }
            /></div >
            <
            /div> < /
            div >
        );
    }
}

export default connect()(App);