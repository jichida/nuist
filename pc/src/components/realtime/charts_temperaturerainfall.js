import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import lodashget from 'lodash.get';
class Page extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let needrender = false;
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
    if(!needrender)
    {
      const nextData = lodashget(nextProps,'option.series[1].data',[]);
      const curData = lodashget(this.props,'option.series[1].data',[]);
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          needrender = true;
        }
      }
    }
    return needrender;
  }

  render() {
    return (
          <ReactEcharts
            option={this.props.option}
            style={{height: '800px', width: '800px'}}
            className='react_for_echarts_last' />
    );
  }
}
const mapStateToProps = (state,props) => {
  const getOption = () => {
    return {
    tooltip : {
      formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
      show : false,
    },
    series : [
      {
         name: '雨量',
         type: 'gauge',
         center: ['77%', '50%'],    // 默认全局居中
         radius: '25%',
         min: 0,
         max: 2,
         startAngle: 135,
         endAngle: 45,
         splitNumber: 2,
         axisLine: {            // 坐标轴线
             lineStyle: {       // 属性lineStyle控制线条样式
                 width: 8
             }
         },
         axisTick: {            // 坐标轴小标记
             splitNumber: 5,
             length: 10,        // 属性length控制线长
             lineStyle: {        // 属性lineStyle控制线条样式
                 color: 'auto'
             }
         },
         axisLabel: {
             formatter:function(v){
                 switch (v + '') {
                     case '0' : return '小';
                     case '1' : return '雨量';
                     case '2' :
                     default:
                      return '大';
                 }
             }
         },
         splitLine: {           // 分隔线
             length: 15,         // 属性length控制线长
             lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                 color: 'auto'
             }
         },
         pointer: {
             width:2
         },
         title : {
             show: false
         },
         detail : {
             show: false
         },
         data:[{value: props.rainfall, name: '毫米'}]
     },
     {
         name: '温度',
         type: 'gauge',
         center : ['77%', '50%'],    // 默认全局居中
         radius : '25%',
         min: 0,
         max: 50,
         startAngle: 315,
         endAngle: 225,
         splitNumber: 2,
         axisLine: {            // 坐标轴线
             lineStyle: {       // 属性lineStyle控制线条样式
                 width: 8
             }
         },
         axisTick: {            // 坐标轴小标记
             show: false
         },
         axisLabel: {
             formatter:function(v){
                 switch (v + '') {
                     case '0' : return '低';
                     case '1' : return '温度';
                     case '2' :
                     default:
                     return '高';
                 }
             }
         },
         splitLine: {           // 分隔线
             length: 15,         // 属性length控制线长
             lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                 color: 'auto'
             }
         },
         pointer: {
             width:2
         },
         title: {
             show: false
         },
         detail: {
             show: false
         },
         data:[{value: props.temperature, name: '℃'}]
     }
   ]
   };
 };
  const option = getOption();
  return {option};
};
export default connect(mapStateToProps)(Page);
