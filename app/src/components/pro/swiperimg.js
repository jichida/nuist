import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import Swiper1 from "../../img/swiper1.png";
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

class App extends React.Component {
  	render() {
      let {bannerproducturls} = this.props;
      if(bannerproducturls.length === 0){
        bannerproducturls.push(Swiper1);
        bannerproducturls.push(Swiper1);
        bannerproducturls.push(Swiper1);
      }
	    return (
	      	<div className="swiperimgPage">
	        	<Swiper
	                swiperOptions={{
	                    slidesPerView: 'auto',
	                    initialSlide : 0,
	                }}
	                {...swiperOptions}
	                className="swiperchartlist"
	                >
                    {
                      lodashmap(bannerproducturls,(url,index)=>{
                        return (<Slide className="Demo-swiper__slide swiperli" key={index}>
      	                	<img alt="" src={url} />
      	                </Slide>);
                      })
                    }
	            </Swiper>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{bannerproducturls}}) => {
    return {bannerproducturls};
}
export default connect(mapStateToProps)(App);
