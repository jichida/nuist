import React from 'react';
import { connect } from 'react-redux';
import ChartsHistory from '../history/charts_history_container.js';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashincludes from 'lodash.includes';

class App extends React.Component {

    render() {
      const {viewtype,showflag} = this.props;
      const {fields} = viewtype;
      let HistoryCo = [];
      if(showflag === '1'){
        lodashmap(fields,(v,k)=>{
          if(HistoryCo.length < 1){
            HistoryCo.push(<li key={k}>
                <h2>历史{`${v.showname}`}曲线</h2>
                <ChartsHistory selfield={k}/>
              </li>);
          }
        })
      }
      else{
        lodashmap(fields,(v,k)=>{
            HistoryCo.push(<li key={k}>
                <h2>历史{`${v.showname}`}曲线</h2>
                <ChartsHistory selfield={k}/>
              </li>);

        })
      }

        return (
          <ul className="curve_lis">
            {HistoryCo}
          </ul>
        );
    }
}

const mapStateToProps = ({app:{ispoppwd,mapstyle},
	userlogin:{loginsuccess,usersettings},device:{devices,devicelist,viewtypes,allowviewtypeids}}) => {
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
    return {ispoppwd,loginsuccess,mapstyle,viewtype};
}
export default connect(mapStateToProps)(App);
