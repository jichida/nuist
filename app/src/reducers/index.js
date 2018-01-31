import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import userlogin from './userlogin';
import routers from './routers';

export default combineReducers({
  	app,
  	userlogin,
  	form: formReducer,
  	router: routerReducer,
  	routers,
});
