import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChartHumidity  from '../realtime/charts_humidity';
import ChartPressure  from '../realtime/charts_pressure';
import ChartTemperatureRainfall  from '../realtime/charts_temperaturerainfall';
import ProductList from './prolist';

class App extends React.Component {
  render() {
    return (
      	<div className="history-data">
            <div className="bor_con">
                <h2 className="title"><img src="images/sjjc.png" alt=""/>
                  <span>数据检测</span>
                </h2>
                <div className="data_box">
                  <ChartHumidity />
                  <ChartPressure />
                  <ChartTemperatureRainfall />
                </div>
            </div>

                <ProductList />
        </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);
