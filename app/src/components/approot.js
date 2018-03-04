import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route } from 'react-router-dom';
import Index from './index/';
import Login from './login';
import Investigation from './investigation';
import AddInvestigation from './investigation/add';
// import ResultInvestigation from './investigation/result';
import Proindex from './pro';
import Monitor from './monitor';
import Datameter from './datameter';
import Video from './video';
import Warning from './warning';
import {requireAuthentication} from './requireauthentication';
/*
  /           首页          ／网站首页，展示相册列表，每一个相册的首张图片
  /album/:day/:id   展示相册图片，  并且展示图片数量，和上一张下一张操作
 
*/
const AppRoot = (props) => {
    return (
            <div className="container">
                <Route exact path="/" component={requireAuthentication(Index)} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/investigation" component={Investigation} />
                <Route exact path="/investigation/add/:id" component={requireAuthentication(AddInvestigation)} />
                {/* <Route exact path="/investigation/result" component={requireAuthentication(ResultInvestigation)} /> */}
                <Route exact path="/pro" component={Proindex} />
                <Route exact path="/datameter/:id/:index" component={requireAuthentication(Monitor)} />
                <Route exact path="/datameter" component={requireAuthentication(Datameter)} />
                <Route exact path="/warning" component={requireAuthentication(Warning)} />
                <Route exact path="/video" component={requireAuthentication(Video)} />
            </div>
    );
}
export default AppRoot;
