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
  const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
      show : false,
    },
    legend: {
        data:['降水量','平均温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
  return {option};
};
export default connect(mapStateToProps)(Page);
