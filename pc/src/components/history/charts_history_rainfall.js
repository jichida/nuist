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
      title : {
          text: curfieldname,
          x: 'center',
          align: 'right'
      },
      grid: {
          bottom: 80
      },
      dataZoom: [{
       type: 'inside',
       start: 0,
       end: 10
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
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              axisLine: {onZero: false},
              data : getformatticktimestring(ticktimestring),
          }
      ],
      yAxis: [
          {

          },
          {
              name: '降雨量(mm)',
              nameLocation: 'start',
              max: 100,
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
