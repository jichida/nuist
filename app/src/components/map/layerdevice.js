// import React from 'react';
// import "./layerdevice.css";
import ImageArrow from '../../img/arrow-right.png';
import ImageLocation from '../../img/location.png';

// class App extends React.Component {
//   render() {
//     return (
//       <div className ="weui-dialog">
//         <div className="weui-dialog__bd">
//           <p>ID:1522<img src={ImageArrow} /></p>
//           <p>风力 3级<span>气压 32%</span></p>
//           <p>风力 3级<span>气压 32%</span></p>
//           <p>风力 3级<span>气压 32%</span></p>
//         </div>
//         <div className="icon-bottom"><img src={ImageLocation} /></div>
//       </div>
//     );
//   }
// }
//
// export default App;
const weui_dialog = `{
    position: fixed;
    z-index: 5000;
    width: 55%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color:rgba(0,0,0,0);
    text-align: center;
    border-radius: 0px;
    overflow: hidden;
}`

const weui_dialog__bd = `{
    padding:12px;
  	background-color:rgba(0,0,0,0.42);
  	border-radius: 8px;
  	box-shadow: 1px 1px 8px 2px rgba(0,0,0,0.1);
  	margin-bottom:10px;
}`;

const weui_dialog__bd_p = `{
    font-size: 13px;
    line-height:20px;
    color: fff;
  	text-align:left;
  	margin: 0px;
}`;

const weui_dialog__bd_p_img = `{
	width:20px;
	height:20px;
	vertical-align: middle;
  display: inline-flex;
	float:right;
}`;

const weui_dialog__bd_p_span = `{
	float:right;
}`;

const icon_bottom_img = `{
	width:30px;
	height:30px;
	vertical-align: middle;
  display: inline-flex;
 }`;

const getDeviceLayerHtml = (curdevice)=>{
  return (`<div style=${weui_dialog}><img src=${ImageLocation} /></div>`);
  return (
        `<div style ="weui-dialog">
          <div class ="weui-dialog__bd">
            <p>ID:1522<img src=${ImageArrow} /></p>
            <p>风力 3级<span>气压 32%</span></p>
            <p>风力 3级<span>气压 32%</span></p>
            <p>风力 3级<span>气压 32%</span></p>
          </div>
          <div class="icon-bottom"><img src=${ImageLocation} /></div>
        </div>`
      );
}

export default getDeviceLayerHtml;
