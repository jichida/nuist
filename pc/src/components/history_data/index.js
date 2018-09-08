import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChartsRealtime from './chartsrealtime';
import ProductList from './prolist';

class App extends React.Component {
  render() {
    return (
      	<div className="right_con rhuadong">
            <ChartsRealtime />
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
