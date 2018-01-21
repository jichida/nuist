import { fork } from 'redux-saga/effects';
// import {apiflow} from './api';
// import {createsagacallbackflow} from './pagination';

import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';

import {socketflow} from './socketflow';
import {uiflow} from './ui';
import config from '../env/config.js';

export default function* rootSaga() {
  try{
    if(config.softmode === 'app'){
      yield fork(jpushflow);
    }

    yield fork(socketflow);

    yield fork(uiflow);
    yield fork(wsrecvsagaflow);
    // yield fork(createsagacallbackflow);
    // yield fork(apiflow);
  }
  catch(e){

  }

}
