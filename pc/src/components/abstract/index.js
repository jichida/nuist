import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="abstract-bar">
      123
      </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);