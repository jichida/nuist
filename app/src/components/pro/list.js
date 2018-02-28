import React from 'react';
import { connect } from 'react-redux';
import Pro1 from "../../img/pro1.png";
import lodashmap from 'lodash.map';

class App extends React.Component {

  	render() {
      const {productlist,products} = this.props;
	    return (
	      	<div className="prolist">
	        	<ul>
              {
                lodashmap((productlist),(pid)=>{
                  const product = products[pid];
                  if(!!product){
                    return (<li key={pid}>
      	        			<div>
      	        				<img src={product.picurl} />
      	        				<div className="name">{product.name}</div>
      	        			</div>
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
