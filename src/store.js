import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  signedInReducer,
  newUrlReducer,
  newLinkReducer,
  userDetailsReducer,
  saveChangeReducer,
} from './reducer';

const rootReducer = combineReducers({
  signedInReducer,
  newUrlReducer,
  newLinkReducer,
  userDetailsReducer,
  saveChangeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
