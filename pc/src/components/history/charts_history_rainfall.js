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
      title : {
          text: curfieldname,
          x: 'center',
          align: 'right'
      },
      grid: {
          bottom: 80
      },
      toolbox: {

      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                  backgroundColor: '#505765'
              }
          }
      },
      legend: {
          data:['降雨量'],
          x: 'left'
      },
      dataZoom: [
      ],
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              axisLine: {onZero: false},
              data : ticktimestring,
          }
      ],
      yAxis: [
          {

          },
          {
              name: '降雨量(mm)',
              nameLocation: 'start',
              max: 5,
              type: 'value',
              inverse: true
          }
      ],
      series: [

          {
              name:'降雨量',
              type:'line',
              yAxisIndex:1,
              animation: false,
              areaStyle: {
                  normal: {}
              },
              lineStyle: {
                  normal: {
                      width: 1
                  }
              },
              markArea: {
                  silent: true,
                  data: [[{
                      xAxis: '2009/9/10\n7:00'
                  }, {
                      xAxis: '2009/9/20\n7:00'
                  }]]
              },
              data: retlist[curfield],
          }
      ]
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
