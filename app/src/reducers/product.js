import { createReducer } from 'redux-act';
import {
  getproductlist_result,
  getproductdetail_result
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    product: {
        productlist:[],
        products: {},
    },
};

const product = createReducer({

  [getproductlist_result]:(state,payload)=>{
      const {list} = payload;
      const productlist = [];
      const products = {...state.products};
      lodashmap(list,(product)=>{
        productlist.push(product._id);
        products[product._id] = product;
      });
      return {...state, productlist,products};
  },
  [getproductdetail_result]:(state,payload)=>{
      const products = {...state.products};
      products[payload._id] = payload;
      return {...state, products};
  },

}, initial.product);

export default product;
