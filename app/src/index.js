import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './approot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Approot />, document.getElementById('root'));
registerServiceWorker();
