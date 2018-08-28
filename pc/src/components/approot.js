import React from 'react';
import { connect } from 'react-redux';
import {
  map_setmapinited,
} from '../actions';
import { Route,Switch } from 'react-router-dom';
import Login from './login';
import Deployment from './deployment';
import Video from './video';
import Realtime from './realtime';
import Forecast from './forecast';
import Index from './index/';
import MapPage from './map';

class AppMap extends React.Component {
    render (){
        const {mapstyle:style4map} = this.props;
        const mapstyleinner = {
          height:style4map.height,
          width:style4map.width
        };
        return (
            <div className="commonmap" style={style4map}>
                <MapPage mapstyle={mapstyleinner}/>
            </div>
        )
    }
}
const mapstyledata = ({app: {mapstyle}}) => {
    return {mapstyle};
}
AppMap = connect(mapstyledata)(AppMap);

class AppRoot extends React.Component {
  componentWillMount() {
      const script = document.createElement("script");
      script.src = "http://webapi.amap.com/maps?v=1.4.9&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Geocoder,AMap.Driving,AMap.MarkerClusterer";
      script.async = true;
      window.init = ()=>{
            const scriptui = document.createElement("script");
            scriptui.src = "http://webapi.amap.com/ui/1.0/main.js?v=1.0.10";
            scriptui.async = true;
            document.body.appendChild(scriptui);
            scriptui.onload = ()=>{
               window.initamaploaded = true;
              this.props.dispatch(map_setmapinited(true));
            }
      }
      document.body.appendChild(script);
  }

    componentWillUnmount() {
        this.props.dispatch(map_setmapinited(false));
        window.initamaploaded = false;
    }
    render() {
      return (
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/adminlogin" component={Login} />
                  <Route exact path="/deployment" component={Deployment} />
                  <Route exact path="/video" component={Video} />
                  <Route exact path="/realtime" component={Realtime} />
                  <Route exact path="/forecast" component={Forecast} />
                  <Route exact path="/deviceinfo/:id/:index" component={Realtime} />
                </Switch>
                <AppMap />
             </div>

  );
}
}
export default connect()(AppRoot);
