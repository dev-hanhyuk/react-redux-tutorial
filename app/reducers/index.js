// Root Reducers
// ROOT/reducers/index.js
import { combineReducers } from 'redux';
import productsReducer from './products';// import products reducer

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;