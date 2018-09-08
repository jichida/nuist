import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';

class Page extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = this.getInitialState();
  // }

  //
  // timeTicket = null;
  // getInitialState = () => ({option: this.getOption()});
  //
  // componentDidMount() {
  //   if (this.timeTicket) {
  //     clearInterval(this.timeTicket);
  //   }
  //   this.timeTicket = setInterval(() => {
  //     const option = cloneDeep(this.state.option);
  //     option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
  //     option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
  //     option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
  //     option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
  //     this.setState({option: option});
  //   }, 1000);
  // };
  //
  // componentWillUnmount() {
  //   if (this.timeTicket) {
  //     clearInterval(this.timeTicket);
  //   }
  // };

  render() {
    return (
          <ReactEcharts
            option={this.props.option}
            style={{height: '240px', width: '240px'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = () => {
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
              max: 220,
              splitNumber: 11,
              radius: '100%',
              axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                      width: 10
                  }
              },
              axisTick: {            // 坐标轴小标记
                  length: 15,        // 属性length控制线长
                  lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto'
                  }
              },
              splitLine: {           // 分隔线
                  length: 20,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      color: 'auto'
                  }
              },
              axisLabel: {
                  backgroundColor: 'auto',
                  borderRadius: 2,
                  color: '#eee',
                  padding: 3,
                  textShadowBlur: 2,
                  textShadowOffsetX: 1,
                  textShadowOffsetY: 1,
                  textShadowColor: '#222'
              },
              title : {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: 14,
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
                  fontWeight: '',
                  fontSize: 16,
                  borderRadius: 0,
                  backgroundColor: '#444',
                  borderColor: '#aaa',
                  shadowBlur: 0,
                  shadowColor: '#333',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  borderWidth: 1,
                  textBorderColor: '#000',
                  textBorderWidth: 0,
                  textShadowBlur: 0,
                  textShadowColor: '#fff',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                  fontFamily: 'Arial',
                  width: 50,
                  color: '#eee',
                  rich: {}
              },
              data:[{value: 56, name: '湿度(%)'}]
          },
      ]
    };
  };
  const option = getOption();
  return {option};
};
export default connect(mapStateToProps)(Page);
