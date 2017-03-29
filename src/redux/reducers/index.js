import { combineReducers } from 'redux';
import { locationReducer } from 'redux-history';

export default combineReducers({
  location: locationReducer
});
