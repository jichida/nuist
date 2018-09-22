import React from 'react';
import moment from 'moment';
import { Fields } from 'redux-form';
import get from 'lodash.get';
import { Map, Marker } from 'react-amap';


class UIMarker extends React.Component {
	constructor(props){
  	super(props);
    this.loadUI(props.__map__);
  }

  loadUI(map){
    window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker)=> {
       new PositionPicker({
           mode: 'dragMap',
           map: map
       }).on('success', (positionResult)=>{
         console.log(positionResult);
				 const position = positionResult.position;
				 const address = positionResult.address;
				 this.props.onChangeValue ({position,address})
       }).start();
    });
  }

  render(){
  	return null;
  }
}



class MapDragSelC extends React.Component {
  constructor(props) {
    super(props);
		const longitude = get(props,'Longitude.input.value',121);
		const latitude = get(props,'Latitude.input.value',30);
		const aliasaddress = get(props,'aliasaddress','address');
		const address = get(props,`${aliasaddress}.input.value`,'');
		this.state = {
			longitude,latitude,address
		}
  }
	onChangeValue(v) {
		const longitude = get(v,'position.lng');
		const latitude = get(v,'position.lat');
		const address = get(v,'address');
		this.setState({
			longitude,
			latitude,
			address
		});
		const onChangeLng = get(this.props,'Longitude.input.onChange');
		if(!!onChangeLng){
			onChangeLng(longitude);
		}

		const onChangeLat = get(this.props,'Latitude.input.onChange');
		if(!!onChangeLat){
			onChangeLat(latitude);
		}

		const aliasaddress = get(this.props,'aliasaddress','address');
		const onChangeAddress = get(this.props,`${aliasaddress}.input.onChange`);
		if(!!onChangeAddress){
			onChangeAddress(address);
		}
	}
  render() {
				// console.log(this.props);
				const {
					longitude,latitude,address
				} = this.state;
				// const longitude0 = get(this.props,'Longitude.input.value',121);
				// const latitude0 = get(this.props,'Latitude.input.value',30);

        return (
                  <div style={{width: '100%'}}>
										<div style={{padding:'10px 0px'}}>
											<span style={{marginRight: '20px'}}>经度:{longitude}</span>
											<span style={{marginRight: '20px'}}>纬度:{latitude}</span>
											<span style={{marginRight: '20px'}}>地址:{address}</span>
										</div>
<div style={{width: '100%', height: '400px'}}>
                    <Map useAMapUI center={[longitude, latitude]} zoom={16} >
                      <UIMarker onChangeValue={(v)=>this.onChangeValue(v)}/>

                    </Map></div>
                  </div>

        );
  }
}


const MapDragSel = (props) => {
  let {source,label,...rest} = props;
  return(
    <span>
      <Fields names={source} component={MapDragSelC} label={label} {...rest}/>
    </span>
)
}


export  {MapDragSel};
