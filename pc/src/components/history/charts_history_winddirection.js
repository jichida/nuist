import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import lodashget from 'lodash.get';
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
            style={{height: '360px', width: '100%'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = (state,props) => {
  const {ticktimestring,retlist,curfield,curfieldname} = props;
  const option = {
      angleAxis: {
          type: 'category',
          data: ticktimestring,
          z: 10
      },
      radiusAxis: {
      },
      polar: {
      },
      series: [{
          type: 'bar',
          data: retlist[curfield],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a',
      }],
  };


 //  const option = {
 //    tooltip: {
 //       trigger: 'axis',
 //       position: function (pt) {
 //           return [pt[0], '10%'];
 //       }
 //   },
 //   title: {
 //       left: 'center',
 //       text: curfieldname,
 //   },
 //   xAxis: {
 //       type: 'category',
 //       boundaryGap: false,
 //       data: ticktimestring
 //   },
 //   yAxis: {
 //       type: 'value',
 //       boundaryGap: [0, '100%']
 //   },
 //   series: [
 //       {
 //           name:curfieldname,
 //           type:'line',
 //           smooth:true,
 //           symbol: 'none',
 //           sampling: 'average',
 //           itemStyle: {
 //               normal: {
 //                   color: 'rgb(81, 179, 200)'
 //               }
 //           },
 //           areaStyle: {
 //               normal: {
 //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
 //                       offset: 0,
 //                       color: 'rgb(119, 151, 164)'
 //                   }, {
 //                       offset: 1,
 //                       color: 'rgb(49, 90, 130)'
 //                   }])
 //               }
 //           },
 //           data: retlist[curfield]
 //       }
 //   ]
 // };
  return {option};
};
export default connect(mapStateToProps)(Page);
