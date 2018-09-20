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
            style={{height: '260px', width: '100%'}}
            className='react_for_echarts' />
    );
  }
}
const mapStateToProps = (state,props) => {
  const {ticktimestring,retlist} = props;
  // console.log(fieldslist_brief);
  // console.log(ticktimestring);
  // console.log(fields);
  // console.log(retlist);

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
            data: ticktimestring,
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
            interval: 25,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name:'降水量',
            type:'bar',
            data:retlist['rainfall']
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:retlist['temperature']
        }
    ]
};
  return {option};
};
export default connect(mapStateToProps)(Page);
