import React from 'react';
import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="proinfo">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">温湿度传感器</div>
		        	<div className="img"><img src={Pro1} /></div>
		        	<div className="info">
						<p className="t">技术参数</p>
						<p>测量参数：大气压力</p>
						<p>测量量程：300~1100 mbar或30~110kpa</p>
						<p>工作温度：-30～70℃；湿度：10～90%RH</p>
						<p>储存温度：-30～80℃；湿度：10～90%RH</p>
						<p>准 确 度：±0.12mbar</p>
						<p>响应时间：＜1 秒</p>
						<p>电缆规格：2 米 3 线制（模拟信号）；</p>
						<p>2 米 4 线制（RS485）（电缆长度可选）</p>
		        	</div>
		        	<div className="closediv"><img className="close" src={Close} /></div>
	        	</div>
	      	</div>
	    );
  	}
}

export default App;
