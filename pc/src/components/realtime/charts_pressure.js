
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
            style={{height: '500px', width: '500px'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = () => {
  const getOption = () => {
    return {
    backgroundColor: '#1b1b1b',
    tooltip : {
      formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
      show : false,
    },
    series : [
      {
        name:'大气压',
        type:'gauge',
        min:0,
        max:220,
        splitNumber:11,
        radius: '50%',
        axisLine: {      // 坐标轴线
          lineStyle: {     // 属性lineStyle控制线条样式
            color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
            width: 3,
            shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        axisLabel: {      // 坐标轴小标记
          textStyle: {     // 属性lineStyle控制线条样式
            fontWeight: 'bolder',
            color: '#fff',
            shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        axisTick: {      // 坐标轴小标记
          length :15,    // 属性length控制线长
          lineStyle: {     // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        splitLine: {       // 分隔线
          length :25,     // 属性length控制线长
          lineStyle: {     // 属性lineStyle（详见lineStyle）控制线条样式
            width:3,
            color: '#fff',
            shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        pointer: {       // 分隔线
          shadowColor : '#fff', //默认透明
          shadowBlur: 5
        },
        title : {
          textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 20,
            fontStyle: 'italic',
            color: '#fff',
            shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        detail : {
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor : '#fff', //默认透明
            shadowBlur: 5,
            offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data:[{value: 101.325, name: 'kPa'}]
        },
      ]
    };
  };
  const option = getOption();
  return {option};
};
export default connect(mapStateToProps)(Page);
