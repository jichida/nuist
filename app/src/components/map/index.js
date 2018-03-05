import React from 'react';
import { connect } from 'react-redux';
import {
	saveusersettings_request
} from '../../actions';
import { Map, Marker } from 'react-amap';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';

const mapkey = '788e08def03f95c670944fe2c78fa76f';

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
          const dlongitude = lodashget(device,'Longitude',110.335736);
          const dlatitude = lodashget(device,'Latitude',20.041613);
          const pos = {longitude:dlongitude,latitude:dlatitude};
          markers.push(<Marker position={pos} key={did}
            clickable
            events={{
              'click': (e) => {
								this.selectdevice(did);
                // console.log(`click device:${did}`)
              }}}
          />);
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
