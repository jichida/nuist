import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import Login from './login';
import Deployment from './deployment';
import Index from './index/';
import {requireAuthentication} from './requireauthentication';

const AppRoot = (props) => {
    return (
            <div className="container">
              <Route exact path="/" component={Index} />
              <Route exact path="/adminlogin" component={Login} />
              <Route exact path="/deployment" component={Deployment} />
            </div>
    );
}
export default AppRoot;
