import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="history-data">
        <header>历史数据曲线</header>
      </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);