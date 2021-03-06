import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashuniq from 'lodash.uniq';
import lodashincludes from 'lodash.includes';
import lodashpull from 'lodash.pull';

import Point1 from "../../img/25.png";
import { set_uiapp } from '../../actions';

class App extends React.Component {

        constructor(props)  {          
            super(props);  
            const initvalue = !props.ismulti ? [props.curvalue] : props.curvalue;
            this.state  =   {
                cursel: initvalue || []
            };
        } 
        onClickClose = () => {
            this.props.dispatch(set_uiapp({
                ispopcaresel_multi: false,
                ispopcaresel_single_index_gateway: false,
                ispopcaresel_single_index_device: false,
                ispopcaresel_single_datameter: false,
                ispopcaresel_single_video: false
            }));
        }
        onClickOK = () => {
            this.props.dispatch(set_uiapp({
                ispopcaresel_multi: false,
                ispopcaresel_single_index_gateway: false,
                ispopcaresel_single_index_device: false,
                ispopcaresel_single_datameter: false,
                ispopcaresel_single_video: false
            }));

            if (!!this.props.onChange) {
                if (!this.props.ismulti) {
                  let curselid = this.state.cursel.length > 0 ? this.state.cursel[0]._id : '';
                  this.props.onChange(curselid);
                } else {
                    this.props.onChange(this.state.cursel);
                }
            }
        }
        onClickSel = (curid, isadd) => {
            let curselarray = this.state.cursel;
            if (!this.props.ismulti) { //单选
                if (curselarray.length === 0) {
                    curselarray.push(curid);
                } else {
                    curselarray[0] = curid;
                }
            } else { //多选
                if (isadd) {
                    curselarray.push(curid);
                    curselarray = lodashuniq(curselarray);
                } else {
                    curselarray = lodashpull(curselarray, curid);
                }
            }
            this.setState({
                cursel: curselarray
            });
        }
        render() {
            const { title, valuedbs, ismulti } = this.props;
            const { cursel } = this.state;
            let selid = '';
            if(!!cursel){
              if(cursel.length > 0){
                selid = cursel.length > 0?cursel[0]._id:'';
              }
            }
            // const titleselected = !ismulti ? '当前' : '关注';
            return ( <div className = "collectionlist" >
                <div className = "editcollectionlist" >
                <div className = "point" > < span className = "title" > { title } < /span> <span className="close" onClick={this.onClickClose}></span > </div>

                <div className = "pointlist" > {
                    lodashmap(valuedbs, (v, k) => {
                            const issel = k === selid;
                            if (!!v) {
                              // debugger;
                                if (issel) {
                                    return ( < div key = { k }
                                        onClick = {
                                            () => this.onClickSel(valuedbs[k], false) }
                                        className = "p2p issel" >
                                        <img alt = ""
                                        src = { Point1 } /> <
                                        span className = "n" > { lodashget(v, 'name') } < /span>
                                        <span className = "tip" > < /span></div > )
                                } else {
                                    return ( < div key = { k }
                                        onClick = {
                                            () => this.onClickSel(valuedbs[k], true) }
                                        className = "p2p" >
                                        <img alt = ""
                                        src = { Point1 } /> <span className = "n" > { lodashget(v, 'name') } < /span> </div>);
                                    }
                                }
                            })
                    } </div>
<div onClick = { this.onClickOK } className = "btn" > 确定 < /div></div> </div>
                );
            }
        }

const mapStateToProps = ({ device: { gateways, devices ,allowviewtypeids} }, props) => {
  const isgateway = props.isgateway;
  const title = isgateway ? '所有网关' : '所有节点';
  const curvalue = isgateway ? gateways[props.value] : devices[props.value];
  let devicedb = {};
  if(!isgateway){
    lodashmap(devices,(v,k)=>{
      if(v.gatewayid === curvalue.gatewayid
        && lodashincludes(allowviewtypeids,v.viewtype)){
        devicedb[k] = v;
      }
    })
  }

  const valuedbs = isgateway ? gateways : devicedb;
  return { title, curvalue, valuedbs };
}

export default connect(mapStateToProps)(App);
