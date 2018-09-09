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
    return needrender;
  }

  render() {
    return (
          <ReactEcharts
            option={this.props.option}
            style={{height: '400px', width: '400px'}}
            className='react_for_echarts' />
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
              name:'湿度',
              type: 'gauge',
              z: 3,
              min: 0,
              max: 110,
              splitNumber: 11,
              radius: '45%',
              axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                      width: 10,
                      shadowBlur: 0,
                      color: [
                        // [0.2, '#30d736'],
                        // [0.8, '#005fb4'],
                        // [1, '#e40000']
                         [0.2, '#06b393'],
                         [0.8, '#2f5b84'],
                         [1, '#a21a1a']
                      ]
                  }
              },
              axisTick: {            // 坐标轴小标记
                  length: -10,        // 属性length控制线长
                  lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto'
                  }
              },
              splitLine: {           // 分隔线
                  length: -15,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      color: 'auto'
                  }
              },
              axisLabel: {
                  backgroundColor: 'auto',
                  borderRadius: 2,
                  color: '#eee',
                  padding: 3,
                  distance:-25,
                  textShadowBlur: 2,
                  textShadowOffsetX: 1,
                  textShadowOffsetY: 1,
                  textShadowColor: '#222'
              },
              title : {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: 20,
                  fontStyle: 'italic'
              },
              detail : {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  formatter: function (value) {
                      value = (value + '').split('.');
                      value.length < 2 && (value.push('00'));
                      return ('00' + value[0]).slice(-2)
                          + '.' + (value[1] + '00').slice(0, 2);
                  },
                  fontWeight: 'bolder',
                  borderRadius: 3,
                  backgroundColor: '#444',
                  borderColor: '#aaa',
                  shadowBlur: 5,
                  shadowColor: '#333',
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                  borderWidth: 2,
                  textBorderColor: '#000',
                  textBorderWidth: 2,
                  textShadowBlur: 2,
                  textShadowColor: '#fff',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                  fontFamily: 'Arial',
                  width: 60,
                  fontSize:22,
                  color: '#eee',
                  rich: {}
              },
              data:[{value: props.humidity, name: '湿度(%)'}]
          },
      ]
    };
  };
  const option = getOption();
  return {option};
};
export default connect(mapStateToProps)(Page);
