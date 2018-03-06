import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map } from 'react-amap';
import {  Marker } from 'react-amap';
import getDeviceLayerHtml from './layerdevice';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';

import {
	saveusersettings_request
} from '../../actions';
const mapkey = '788e08def03f95c670944fe2c78fa76f';

const getMarker = ({curdevice,selectdevice})=>{
  const longitude = lodashget(curdevice,'Longitude',110.335736);
  const latitude = lodashget(curdevice,'Latitude',20.041613);
  const did = lodashget(curdevice,'_id');
  const pos = {longitude,latitude};

	const pointhtml = getDeviceLayerHtml(curdevice);
	console.log(pointhtml);
  return (<Marker
		content={pointhtml}
		position={pos}
		key={did}
    clickable
    events={{
      'click': (e) => {
        selectdevice(did);
      }}}
  />)
}

class App extends React.Component {
    selectdevice = (did)=>{
      const usersettings = this.props.usersettings;
      usersettings.indexdeviceid = did;
      this.props.dispatch(saveusersettings_request(usersettings));
    }
  	render() {
      const {curdevice,devicelist,devices} = this.props;
      const longitude = lodashget(curdevice,'Longitude',110.335736);
      const latitude = lodashget(curdevice,'Latitude',20.041613);
      const markers = [];
      lodashmap(devicelist,(did)=>{
        const device = devices[did];
        if(!!device){
          markers.push(getMarker({curdevice:device,selectdevice:this.selectdevice}));
        }
      });
    	return (
      		<Map amapkey={mapkey} zoom={15} center={{longitude,latitude}}
            plugins={[
								{
					        name: 'ToolBar',
									options:{
										  locate:false,
											position: 'RT',
									}
								}
							]}
            status={{zoomEnable:true,touchZoom:true}}>
            {markers}
          </Map>
    	);
  	}
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}}) => {
    return {devicelist,devices,usersettings};
}
export default connect(mapStateToProps)(App);
