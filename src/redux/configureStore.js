import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import initialState from './initialState';

export default () => {
  return createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
};
