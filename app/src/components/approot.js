import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index/';
import Login from './login';
import Investigation from './investigation';
import AddInvestigation from './investigation/add';
// import ResultInvestigation from './investigation/result';
import Proindex from './pro';
import Monitor from './deviceinfo';
import Datameter from './datameter';
import DeviceinfoHistory from './history';
import Video from './video';
import Warning from './warning';
import {requireAuthentication} from './requireauthentication';
import {
  map_setmapinited,
} from '../actions';
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
/*
  /           首页          ／网站首页，展示相册列表，每一个相册的首张图片
  /album/:day/:id   展示相册图片，  并且展示图片数量，和上一张下一张操作
 
*/
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
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/investigation" component={Investigation} />
                  <Route exact path="/investigation/add/:id" component={requireAuthentication(AddInvestigation)} />
                  {/* <Route exact path="/investigation/result" component={requireAuthentication(ResultInvestigation)} /> */}
                  <Route exact path="/pro" component={Proindex} />
                  <Route exact path="/deviceinfo/:id/:index" component={Monitor} />
                  <Route exact path="/history/:id" component={DeviceinfoHistory} />
                  <Route exact path="/datameter" component={Datameter} />
                  <Route exact path="/warning" component={Warning} />
                  <Route exact path="/video" component={Video} />
                </Switch>
                <AppMap />
              </div>

      );
  }
}
export default connect()(AppRoot);
