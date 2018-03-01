import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import userlogin from './userlogin';
import routers from './routers';
import product from './product';
import device from './devices';
import vote from './vote';

export default combineReducers({
  	app,
    device,
  	userlogin,
    vote,
    product,
  	form: formReducer,
  	router: routerReducer,
  	routers,
});
