import {combineReducers} from 'redux';
import features from './features';
import showPanel from './showPanel';
import showBidder from './showBidder'


export default combineReducers({
    features,showPanel,showBidder
}) 