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
      <div className="prolist">
        <ul>
					{
						lodashmap((productlist),(pid)=>{
							const product = products[pid];
							if(!!product){
								return (<li key={pid} onClick={()=>{this.onClickPopProductInfo(product)}}>
									<div className="l">
										<div className="pro"><img alt="" src={product.picurl} /></div>
										<div className="tt">{product.name}</div>
									</div>
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
