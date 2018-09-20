import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChartsRealtime from './chartsrealtime';
import ProductList from './prolist';

class App extends React.Component {
  render() {
      const {shownum,onClickPopProductInfo} = this.props;
    return (
      	<div className="right_con rhuadong">
            <ChartsRealtime shownum={shownum}/>

        </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);

//<ProductList onClickPopProductInfo={onClickPopProductInfo}/>
