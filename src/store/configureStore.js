import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function confgureStore(initialState) {

  const store = createStore(rootReducer, initialState, applyMiddleware(reduxThunk));

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default); // eslint-disable-line global-require
    });
  }

  return store;
};
