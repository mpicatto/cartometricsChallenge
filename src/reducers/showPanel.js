import{SHOW_PANEL} from '../actions/showPanel'

const initialState={
    showPanel:false
}

export default function showPanel(state=initialState,action){
    if(action.type===SHOW_PANEL){
        return{
            ...state,
            showPanel:action.payload
        }
    }

    return state
}