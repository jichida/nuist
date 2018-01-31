import React from 'react';
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
	                <Slide className="Demo-swiper__slide swiperli">
	                	<img src={Swiper1} />
	                </Slide>
	                <Slide className="Demo-swiper__slide swiperli">
	                	<img src={Swiper1} />
	                </Slide>
	                <Slide className="Demo-swiper__slide swiperli">
	                	<img src={Swiper1} />
	                </Slide>
	            </Swiper>
	      	</div>
	    );
  	}
}

export default App;
