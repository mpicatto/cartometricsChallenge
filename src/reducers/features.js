import {SET_FEATURE,CLEAN_FEATURE} from '../actions/features'

const initialState={
    contacto:"",
    description:"",
    lastVisit:"",
    price:"",
    refcat:""
}

export default function features(state=initialState,action){
    if(action.type===SET_FEATURE){
        return state=action.payload
    }
    if(action.type===CLEAN_FEATURE){
        return state=initialState
    }

    return state
}

// {
//     ...state,
//     contacto:action.payload.contacto,
//     description:action.payload.description,
//     lastVisit:action.payload.lastVisit,
//     price:action.payload.price,
//     refcat:action.payload.refcat
// }