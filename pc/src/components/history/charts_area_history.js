import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

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
            style={{height: '360px', width: '100%'}}
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
   title: {
       left: 'center',
       text: curfieldname,
   },
   xAxis: {
       type: 'category',
       boundaryGap: false,
       data: ticktimestring
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
                   color: 'rgb(255, 70, 131)'
               }
           },
           areaStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: 'rgb(255, 158, 68)'
                   }, {
                       offset: 1,
                       color: 'rgb(255, 70, 131)'
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
