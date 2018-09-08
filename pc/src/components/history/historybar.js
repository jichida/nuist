import React from 'react';
import { connect } from 'react-redux';


class App extends React.Component {

    render() {
        return (

          <ul className="curve_lis">
            <li>
              <h2>历史风向曲线</h2>
              <img src="images/tup1.png" style={{width:'100%'}} alt=""/>
            </li>
          </ul>

        );
    }
}

const mapStateToProps = ({app:{mapstyle}})=> {
    return {mapstyle};
}
export default connect(mapStateToProps)(App);
