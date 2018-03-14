import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map } from 'react-amap';
import {  Marker } from 'react-amap';
import getDeviceLayerHtml from './layerdevice';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
// import "./index.css";
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
	// console.log(pointhtml);//offset={{x:-65, y:-34}}
  return (<Marker
		offset={[-110,-86]}
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
			})

			console.log(`map center---->${JSON.stringify({longitude,latitude})}`)
    	return (
      		<Map  zoom={15}  amapkey={mapkey} center={{longitude,latitude}}
            plugins={[
								{
					        name: 'ControlBar',
									options:{
										  locate:false,
											position: 'RT',
									}
								}
							]}
            status={{zoomEnable:true,touchZoom:false}}>
            {markers}
          </Map>
    	);
  	}
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}},props) => {
		let curdevice = props.curdevice;
		if(!curdevice){
			let curdeviceid = lodashget(usersettings,'indexdeviceid');
			if(!!curdeviceid){
				curdevice = devices[curdeviceid];
			}
		}

		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {devicelist,devices,usersettings,curdevice};
}
export default connect(mapStateToProps)(App);
