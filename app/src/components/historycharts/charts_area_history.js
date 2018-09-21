import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import lodashget from 'lodash.get';
import {getformatticktimestring} from '../../util/formataxisLabel';
class Page extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let needrender = false;
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
    }

    return needrender;//render
  }
  render() {
    return (
          <ReactEcharts
            option={this.props.option}
            style={{height: '260px', width: '100%'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = (state,props) => {
  const {ticktimestring,retlist,curfield,curfieldname} = props;
  // console.log(fieldslist_brief);
  // console.log(ticktimestring);
  // console.log(fields);
  // console.log(retlist);

  const option = {
    tooltip: {
       trigger: 'axis',
       position: function (pt) {
           return [pt[0], '10%'];
       }
   },
   dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
   title: {
       left: 'center',
       text: curfieldname,
   },
   xAxis: {
       type: 'category',
       boundaryGap: false,
       data: getformatticktimestring(ticktimestring)
   },
   yAxis: {
       type: 'value',
       boundaryGap: [0, '100%']
   },
   series: [
       {
           name:curfieldname,
           type:'line',
           smooth:true,
           symbol: 'none',
           sampling: 'average',
           itemStyle: {
               normal: {
                   color: 'rgb(81, 179, 200)'
               }
           },
           areaStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: 'rgb(119, 151, 164)'
                   }, {
                       offset: 1,
                       color: 'rgb(49, 90, 130)'
                   }])
               }
           },
           data: retlist[curfield]
       }
   ]
 };
  return {option};
};
export default connect(mapStateToProps)(Page);
