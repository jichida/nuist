import React from 'react';
import "./style.css";

class App extends React.Component {
    render() {
        return (
            <div className="footer">
          	    <div className="tit">南京信息工程大学</div>
              	<div className="nav">
                    <div>政府网站</div>
                    <div>省厅局网站</div>
                    <div>网上江苏</div>
                    <div>其他</div>
              	</div>
                <div className="info">南京市宁六路219号（邮编：210044    电话：025-58731575）    苏ICP备11031102号</div>
            </div>
        );
    }
}

export default App;
