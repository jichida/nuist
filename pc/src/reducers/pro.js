import { createReducer } from 'redux-act';
import { set_showproid } from '../actions';

const initial = {
    pro: {
        showproid: "",
    },
};

const pro = createReducer({

    [set_showproid]:(state,payload)=>{
        return {...state, showproid : payload};
    },

}, initial.pro);

export default pro;