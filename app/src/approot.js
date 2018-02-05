import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route } from 'react-router-dom';
import Index from './components/index/';
import Login from './components/login';
import Investigation from './components/investigation';
import AddInvestigation from './components/investigation/add';
import ResultInvestigation from './components/investigation/result';
import Proindex from './components/pro';
import Monitor from './components/monitor';
import Datameter from './components/datameter';
import Warning from './components/warning';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();
/*
  /           首页          ／网站首页，展示相册列表，每一个相册的首张图片
  /album/:day/:id   展示相册图片，  并且展示图片数量，和上一张下一张操作

*/
const AppRoot = (props) => {
    return (
        <Router history={customHistory}>
            <div className="container">
                <Route exact path="/" component={Index} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/investigation" component={Investigation} />
                <Route exact path="/investigation/add" component={AddInvestigation} />
                <Route exact path="/investigation/result" component={ResultInvestigation} />
                <Route exact path="/pro" component={Proindex} />
                <Route exact path="/datameter/:id" component={Monitor} />
                <Route exact path="/datameter" component={Datameter} />
                <Route exact path="/warning" component={Warning} />
            </div>
        </Router>
    );
}
export default AppRoot;