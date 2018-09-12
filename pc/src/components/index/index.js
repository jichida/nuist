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
import { Popover } from 'antd';
import QueryPage from '../history/querypage.js';
import Info from '../history_data/info';
// // import Monitoring from "./monitoring";
// // import Investigation from "./investigation";
// import DataChart from './datachart';
// import ProductList from './prolist';
// import Footer from "../footer";
import Changepwd from "./pwd.js";
import lodashmap from 'lodash.map';
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
    const {ispoppwd,ispopproductinfo,loginsuccess,viewtype} = this.props;
    const {fields} = viewtype;

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
            <div className="map_con border">
              <div id='mapidplaceholder' style={{height:'400px'}}/>
            </div>
            <div className="bor_con con_height">
                <h2 className="title">
                  <img src="images/lssj.png" alt=""/>
                  <span>  <Popover
                      content={<QueryPage />}
                      title="Title"
                      trigger="click"
                      visible={this.state.visible}
                      onVisibleChange={this.handleVisibleChange}
                    >
                    历史数据</Popover></span>
                  <div className="title_tab">
                    {
                      lodashmap(fields,(v,k)=>{
                        if(k === selfield){
                          return (<span key={k} className="active">{v.showname}</span>);
                        }
                        return (<span key={k} onClick={()=>{
                          this.setState({selfield:k})
                        }
                        }>{v.showname}</span>);
                      })
                    }
                  </div>
                </h2>
                <div className="curve_box">
                  <ChartsHistory selfield={selfield}/>
                </div>
            </div>
          </div>

          <HistoryDataBar shownum={2} onClickPopProductInfo={this.onClickPopProductInfo}/>
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

const mapStateToProps = ({app:{ispoppwd,ispopproductinfo,mapstyle},
	userlogin:{loginsuccess},device:{viewtype}}) => {
    return {ispoppwd,ispopproductinfo,loginsuccess,mapstyle,viewtype};
}
export default connect(mapStateToProps)(App);
