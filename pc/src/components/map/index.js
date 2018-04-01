/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {
  carmapshow_createmap,
  carmapshow_destorymap,
} from '../../actions';
import lodashmap from 'lodash.map';
const divmapid = 'mapmain';

class Page extends React.Component {
  componentWillMount () {
    console.log('地图---->componentWillMount---------');
  }
  componentWillUnmount(){
    console.log('地图---->componentWillUnmount---------');
    this.props.dispatch(carmapshow_destorymap({divmapid}));
  }
  componentDidMount () {
    console.log('地图---->componentDidMount---------');
    this.props.dispatch(carmapshow_createmap({divmapid}));
 }
 shouldComponentUpdate(nextProps, nextState){
   const {mapstyle:mapstyle1} = this.props;
   const {mapstyle:mapstyle2} = nextProps;
   let shouldupdate = false;
   lodashmap(mapstyle1,(v,k)=>{
     if(mapstyle1[k] !== mapstyle2[k]){
       shouldupdate = true;
     }
   })
   return shouldupdate;
 }
 render() {
     const {mapstyle} = this.props;
     console.log(`地图---->render---------${JSON.stringify(mapstyle)}`);
     return (
         <div className="AdminContent">
             <div id={divmapid} style={mapstyle}/>
         </div>
     );
 }
}

export default connect()(Page);
