import { createReducer } from 'redux-act';
import { set_routers } from '../actions';

const initial = {
    routers: {
        routername: "",
    },
};

const routers = createReducer({

    [set_routers]:(state,payload)=>{
        return {...state, routername : payload};
    },

}, initial.routers);

export default routers;
