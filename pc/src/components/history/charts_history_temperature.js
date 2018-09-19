import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import {getformatticktimestring} from '../../util/formataxisLabel';
import lodashget from 'lodash.get';
class Page extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let needrender = false;
    if(!needrender){
      const nextData = lodashget(nextProps,'_id','');
      const curData = lodashget(this.props,'_id','');
      if( nextData !== curData ){
          needrender = true;
      }
    }
    if(!needrender)
    {
      const nextData = lodashget(nextProps,'option.title.text','');
      const curData = lodashget(this.props,'option.title.text','');
      if( nextData !== curData ){
          needrender = true;
      }
    }

    if(!needrender)
    {
      const nextData = lodashget(nextProps,'option.xAxis.data',[]);
      const curData = lodashget(this.props,'option.xAxis.data',[]);
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) !== JSON.stringify(curData)){
          needrender = true;
        }
      }
      else{
        needrender = true;
      }
    }

    if(!needrender)
    {
      const nextData = lodashget(nextProps,'option.series[0].data',[]);
      const curData = lodashget(this.props,'option.series[0].data',[]);
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          needrender = true;
        }
      }
      else{
        needrender = true;
      }
    }

    return needrender;//render
  }
  render() {
    return (
          <ReactEcharts
            option={this.props.option}
            style={{height: '360px', width: '100%'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = (state,props) => {
  const {ticktimestring,retlist,curfield,curfieldname} = props;
  const option = {
      title: {
          left: 'center',
          text: curfieldname,
      },
      xAxis: {
          type: 'category',
          data: getformatticktimestring(ticktimestring)
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: retlist[curfield],
          type: 'line'
      }]
  };

  return {option};
};
export default connect(mapStateToProps)(Page);
