import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
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
    let {bannerproducturls} = this.props;
    if(bannerproducturls.length === 0){
      bannerproducturls.push(Img1);
      bannerproducturls.push(Img1);
      bannerproducturls.push(Img1);
    }
    return (
      <div className="swiper_indexPage" >
        <Swiper
          swiperOptions={{
              slidesPerView: 'auto',
              initialSlide : 0,
          }}
          {...swiperOptions}
          >
            {
              lodashmap(bannerproducturls,(url,index)=>{
                return (<Slide className="Demo-swiper__slide " key={index}>
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
