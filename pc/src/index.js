import React from 'react';
import ReactDOM from 'react-dom';
import {sagaMiddleware} from './env/store';
import rootSaga from './sagas';
import Approot from './approot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Approot />, document.getElementById('root'));
registerServiceWorker();
