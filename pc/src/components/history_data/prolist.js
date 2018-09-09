import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';


import "./prolist.css";

class App extends React.Component {


  render() {
    const {productlist,products} = this.props;
    return (
			<div className="bor_con border_top">
					<h2 className="title">
						<img src="images/cpzs.png" alt=""/><span>产品展示</span>
					</h2>
        	<ul className="prolist">
					{
						lodashmap((productlist),(pid)=>{
							const product = products[pid];
							if(!!product){
								return (<li key={pid} onClick={()=>{this.props.onClickPopProductInfo(product)}}>
											<p>{product.name}</p><img src={product.picurl}  alt=""/>
									</li>);
							}
						})
					}
        </ul>

      </div>
    );
  }
}

const mapStateToProps = ({product:{productlist,products}}) => {
    return {productlist,products};
}
export default connect(mapStateToProps)(App);
