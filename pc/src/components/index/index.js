import React from 'react';
import { connect } from 'react-redux';
// import "./index.css";
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import ChartsHistory from '../history/charts_history_container.js';
// import Login from "./login.js";
// import Weather from "./weather";
// import Swiper from "./swiper";
// import { Popover } from 'antd';
import QueryPage from '../history/querypage.js';
import Info from '../history_data/info';
// // import Monitoring from "./monitoring";
// // import Investigation from "./investigation";
// import DataChart from './datachart';
// import ProductList from './prolist';
// import Footer from "../footer";
import Changepwd from "./pwd.js";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import lodashincludes from 'lodash.includes';
import {
  ui_notifyresizeformap,
  ui_setmapstyle
} from '../../actions';
import {
	set_uiapp,
} from '../../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selfield:'',
      visible: false,
      curproduct:null
    };
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  onClickPopProductInfo = (curproduct)=>{
    this.setState({curproduct});
    this.props.dispatch(set_uiapp({ispopproductinfo:true}));
  }
  componentDidMount(){

    const setmapstyle = (delay)=>{
      // window.setTimeout(()=>{
        this.props.dispatch(ui_notifyresizeformap({
          divid:'mapidplaceholder',
          delay
        }));
      // },0);
    }

    setmapstyle(0);

    window.addEventListener('resize', ()=>{
      setmapstyle(50);
    });
  }

  componentWillUnmount() {
    const {mapstyle} = this.props;
    const mapstylenew = {...mapstyle,display:'none'};

    this.props.dispatch(ui_setmapstyle(mapstylenew));
    window.removeEventListener('resize',()=>{
    });
  }
  render() {
    const {ispoppwd,ispopproductinfo,loginsuccess,viewtype,savequery_historychart} = this.props;
    if(!viewtype){
      return <div></div>
    }
    const {fields,fieldslist_detail} = viewtype;
    const {from,to} = savequery_historychart;

    let selfield = this.state.selfield;
    lodashmap(fields,(v,k)=>{
      if(!selfield){
        selfield = k;
      }
    })

    return (
      <div className="index-page root-page">
        <Header />
        <div className="w_1220">
          <AbstractBar />

          <div className="center_con">
            <div className="map_con border ">
              <div id='mapidplaceholder' className="map_box"/>
            </div>
            <div className="bor_con con_height">
                <h2 className="title">
                  <img src="images/lssj.png" alt=""/>
                  <span>
                    历史数据</span>
                      <span className="tt"><QueryPage type="historychart" from={from} to={to}/></span>
                  <div className="title_tab">
                    {
                      lodashmap(fieldslist_detail,(k)=>{
                        if(k === selfield){
                          return (<span key={k} className="active">{fields[k].showname}</span>);
                        }
                        return (<span key={k} onClick={()=>{
                          this.setState({selfield:k})
                        }
                        }>{fields[k].showname}</span>);
                      })
                    }
                  </div>
                </h2>
                <div className="curve_box">
                  <ChartsHistory selfield={selfield}/>
                </div>
            </div>
          </div>

          <HistoryDataBar shownum={100} onClickPopProductInfo={this.onClickPopProductInfo}/>
        </div>
        {ispoppwd && loginsuccess && <Changepwd />}
        { ispopproductinfo && <Info curproduct={this.state.curproduct}/>}
      </div>
    //   <div className="indexPage">
    //     <Header />
    //     <div className="content">
    //     	<div className="indextit">欢迎访问大坝智能监控系统</div>
    //     	<div className="cont">
		// 		<div className="left">
		// 			<Login />
		// 			<Weather />
		// 		</div>
		// 		<div className="center">
		// 			<Swiper />
		// 			<div id='mapidplaceholder' style={{height:'300px',width:'550px'}}/>
		// 		</div>
		// 		<div className="right">
		// 			<Monitoring />
		// 			<Investigation />
		// 		</div>
		// 	</div>
		// 	<DataChart />
		// 	<ProductList />
    //     </div>
    //     {ispoppwd && loginsuccess && <Changepwd />}
    //     <Footer />
    // </div>
    );
  }
}

const mapStateToProps = ({app:{ispoppwd,ispopproductinfo,mapstyle,savequery_historychart},
	userlogin:{loginsuccess,usersettings},device:{devices,viewtypes,allowviewtypeids,devicelist}}) => {
    let curdevice;
    let curdeviceid = lodashget(usersettings,'indexdeviceid');
    if(!!curdeviceid){
      curdevice = devices[curdeviceid];
    }
    if(!curdevice){
      for(let i = 0 ;i < devicelist.length ;i++){
        if(lodashincludes(allowviewtypeids,devicelist[i].viewtype)){
          curdevice = devices[devicelist[i]];
          break;
        }
      }
    }
    let viewtype = {};
    if(!!curdevice){
      viewtype = viewtypes[curdevice.viewtype];
    }
    return {ispoppwd,ispopproductinfo,loginsuccess,mapstyle,viewtype,savequery_historychart};
}
export default connect(mapStateToProps)(App);
