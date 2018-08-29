import React from 'react';
import { connect } from 'react-redux';
import {
  ui_notifyresizeformap,
  ui_setmapstyle
} from '../../actions';

class App extends React.Component {
  componentDidMount(){
    const setmapstyle = (delay)=>{
      // window.setTimeout(()=>{
        this.props.dispatch(ui_notifyresizeformap({
          divid:'mapidplaceholder',
          delay
        }));
      // },0);
    }

    setmapstyle(0);

    window.addEventListener('resize', ()=>{
      setmapstyle(50);
    });
  }

  componentWillUnmount() {
    const {mapstyle} = this.props;
    const mapstylenew = {...mapstyle,display:'none'};

    this.props.dispatch(ui_setmapstyle(mapstylenew));
    window.removeEventListener('resize',()=>{
    });
  }

  render() {
    const height = window.innerHeight+"px";
    const width = window.innerWidth+"px";
    return (<div id="mapidplaceholder" style={{height:`${height}`,width:`${width}`}}/>);
  }

}

export default connect()(App);
