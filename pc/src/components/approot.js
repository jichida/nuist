import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Deployment from './deployment';
import Video from './video';
import Realtime from './realtime';
import Forecast from './forecast';
import Index from './index/';
// import {requireAuthentication} from './requireauthentication';

const AppRoot = (props) => {
    return (
            <div className="container">
              <Route exact path="/" component={Index} />
              <Route exact path="/adminlogin" component={Login} />
              <Route exact path="/deployment" component={Deployment} />
              <Route exact path="/video" component={Video} />
              <Route exact path="/realtime" component={Realtime} />
              <Route exact path="/forecast" component={Forecast} />
            </div>
    );
}
export default AppRoot;
