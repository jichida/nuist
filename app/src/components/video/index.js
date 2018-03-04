import React from 'react';
import "./style.css";
import Header from "../header/page.js";
import { connect } from 'react-redux';
import Demo from "../../img/videodemo.png";
// import List from "./list.js";
import Filler from "./filler.js";
import Footer from "../footer";
import PopcareSel from "../popcaresel";
import lodashget from 'lodash.get';
import {
	saveusersettings_request
} from '../../actions';

class App extends React.Component {
    onChangeCaresel = (value)=>{
      let usersettings = this.props.usersettings;
      usersettings.indexdeviceid = value;
      this.props.dispatch(saveusersettings_request(usersettings));
    }
    render() {
        const {ispopcaresel_single_video,curdevice} = this.props;
        return (
            <div className="datameterPage">
                <Header title="视频监控" history={this.props.history} ishidereturn/>
                { !!curdevice && <Filler curdevice={curdevice}/> }
                {
                  !!curdevice && (
                    <div className="videodata">
                    <ul>
                      <li className="tt">
                        <div className="img"><img src={Demo} /></div>
                        <div className="li"><span className="name">{lodashget(curdevice,'addressname','')}</span><span className="runing">正在播放</span></div>
                      </li>
                    </ul>
                  </div>)
               }
                <Footer history={this.props.history} sel={"video"} />
                {ispopcaresel_single_video && <PopcareSel value={curdevice._id} onChange={this.onChangeCaresel}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings},app:{ispopcaresel_single_video}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {curdevice,devicelist,devices,ispopcaresel_single_video};
}
export default connect(mapStateToProps)(App);
