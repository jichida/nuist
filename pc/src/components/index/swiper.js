import React from 'react';
import Img1 from "../../img/z1.jpg";
import "./swiper.css";
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';;
let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

class App extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const styles = {
      slide: {
        width: 550,
        minHeight: 280,
        overflow : "hidden"
      },
    };
    const { index } = this.state;
    return (
      <div className="swiper_indexPage">
        <Swiper
          swiperOptions={{
              slidesPerView: 'auto',
              initialSlide : 0,
          }}
          {...swiperOptions}
          >
          <Slide className="Demo-swiper__slide">
              <img src={Img1} />
          </Slide>
          <Slide className="Demo-swiper__slide">
              <img src={Img1} />
          </Slide>
          <Slide className="Demo-swiper__slide">
              <img src={Img1} />
          </Slide>
        </Swiper>
      </div>
    );
  }
}

export default App;
