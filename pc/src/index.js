import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './env/root';
import {sagaMiddleware} from './env/store';
import rootSaga from './sagas';
// import moment from 'moment';
import 'moment/locale/zh-cn';
// import registerServiceWorker from './registerServiceWorker';

sagaMiddleware.run(rootSaga);
ReactDOM.render(<Approot />, document.getElementById('root'));
