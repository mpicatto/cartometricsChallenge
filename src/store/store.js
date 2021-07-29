import { createStore, applyMiddleware} from "redux";
import rootReducer from '../reducers/index';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState)
  } catch(e){
    console.log(e)
  }
}

const store = createStore(
  rootReducer,
  
  composeWithDevTools(applyMiddleware(thunk),
));

store.subscribe(()=>saveToLocalStorage(store.getState()))

export default store;