import{SHOW_BIDDER} from '../actions/showBidder'

const initialState={
    showBidder:false
}

export default function showPanel(state=initialState,action){
    if(action.type===SHOW_BIDDER){
        return{
            ...state,
            showBidder:action.payload
        }
    }

    return state
}