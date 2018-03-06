import ImageArrow from '../../img/arrow-right.png';
import ImageLocation from '../../img/location.png';

const style_weui_dialog = `
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
`

const style_weui_dialog__bd = `
    padding:12px;
  	background-color:rgba(0,0,0,0.42);
  	border-radius: 8px;
  	box-shadow: 1px 1px 8px 2px rgba(0,0,0,0.1);
  	margin-bottom:10px;
`;

const style_weui_dialog__bd_p = `
    font-size: 13px;
    line-height:20px;
    color: fff;
  	text-align:left;
  	margin: 0px;
`;

const style_weui_dialog__bd_p_img = `
	width:20px;
	height:20px;
	vertical-align: middle;
  display: inline-flex;
	float:right;
`;

const style_weui_dialog__bd_p_span = `
	float:right;
`;

const style_icon_bottom_img = `
	width:30px;
	height:30px;
	vertical-align: middle;
  display: inline-flex;
 `;

const getDeviceLayerHtml = (curdevice)=>{
  // return (`<div style=${weui_dialog}><img src=${ImageLocation} /></div>`);
  return (
        `<div style =${style_weui_dialog}>
          <div style = ${style_weui_dialog__bd}>
            <p style = ${style_weui_dialog__bd_p}>
              ID:1522
              <img style=${style_weui_dialog__bd_p_img} src=${ImageArrow} />
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              风力 3级
              <span style=${style_weui_dialog__bd_p_span}>
                气压 32%
              </span>
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              风力 3级
              <span style=${style_weui_dialog__bd_p_span}>
                气压 32%
              </span>
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              风力 3级
              <span style=${style_weui_dialog__bd_p_span}>
                气压 32%
              </span>
            </p>
          </div>
          <div>
            <img style=${style_icon_bottom_img} src=${ImageLocation} />
          </div>
        </div>`
      );
}

export default getDeviceLayerHtml;
