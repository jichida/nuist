import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import Info from './info';
import {
	set_uiapp,
} from '../../actions';
import "./prolist.css";

class App extends React.Component {
	constructor(props) {  
        super(props);  
        this.state = {curproduct:null};
	} 
	onClickPopProductInfo = (curproduct)=>{
		this.setState({curproduct});
		this.props.dispatch(set_uiapp({ispopproductinfo:true}));
	}
  render() {
    const {productlist,products,ispopproductinfo} = this.props;
    return (
			<div className="bor_con">
					<h2 className="title">
						<img src="images/cpzs.png" alt=""/><span>产品展示</span>
					</h2>
        	<ul className="prolist">
					{
						lodashmap((productlist),(pid)=>{
							const product = products[pid];
							if(!!product){
								return (<li key={pid} onClick={()=>{this.onClickPopProductInfo(product)}}>
											<p>{product.name}</p><img src="images/img5.png" alt=""/>
									</li>);
							}
						})
					}
        </ul>
		  { ispopproductinfo && <Info curproduct={this.state.curproduct}/>}
      </div>
    );
  }
}

const mapStateToProps = ({product:{productlist,products},app:{ispopproductinfo}}) => {
    return {productlist,products,ispopproductinfo};
}
export default connect(mapStateToProps)(App);
