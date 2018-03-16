import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map } from 'react-amap';
import {  Markers } from 'react-amap';
// import getDeviceLayerHtml from './layerdevice';
import MarkDevice from './markdevice';
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

	// const pointhtml = getDeviceLayerHtml(curdevice);
	return {
		// offset:[-110,-86],
		// content:pointhtml,
		position:pos,
		// clickable:true,
		did:did,
		// events:()=>{
		// 	selectdevice(did);
		// }
	}
	// console.log(pointhtml);//offset={{x:-65, y:-34}}
  // return (<Marker
	// 	offset={[-110,-86]}
	// 	content={pointhtml}
	// 	position={pos}
	// 	key={did}
  //   clickable
  //   events={{
  //     'click': (e) => {
  //       selectdevice(did);
  //     }}}
  // />)
}

class App extends React.Component {
		constructor(props) {
			super(props);
			this.markersEvents = {
				click(e, marker){
						// 通过高德原生提供的 getExtData 方法获取原始数据
						const extData = marker.getExtData();
						const did = extData.did;
						console.log(e);
						console.log(marker);
						// alert(`点击的是第${did}坐标点`);
						return true;
					}
			}
			this.clusterevent= {
				click(e){
						// alert(e);
						console.log(e);
						e.map.zoomIn();
						return true;
					}
			}
		}
    selectdevice = (did)=>{
      const usersettings = this.props.usersettings;
      usersettings.indexdeviceid = did;
      this.props.dispatch(saveusersettings_request(usersettings));
    }

		renderMarkerFn = (extData) => {
			const {devices} = this.props;
			const curdevice = devices[extData.did];
			return <span>{extData.did}</span>
			// return <MarkDevice curdevice={curdevice} />;
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
						<Markers
							events={this.markersEvents}

            	markers={markers}
            	useCluster={{events:this.clusterevent}}
          />

          </Map>
    	);
  	}
}

// ={{zoomOnClick:true}}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}}) => {
    return {devicelist,devices,usersettings};
}
export default connect(mapStateToProps)(App);
