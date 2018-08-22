// @flow
/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose, type Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createReducer from './reducers';
import persistConfig from './persist';
import type { ApplicationState } from './state';

export default function configureStore(initialState: any = {}, history: any) {
  const persistedReducer = persistReducer(
    persistConfig,
    connectRouter(history)(createReducer())
  );

  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }

  const enhancers = [applyMiddleware(...middlewares)];

  let composeEnhancers = null;
  /* eslint-disable no-underscore-dangle */
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
      // Prevent recomputing reducers for `replaceReducer`
      shouldHotReload: false,
    });
  } else {
    composeEnhancers = compose;
  }
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    (persistedReducer: any),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // $FlowIssue
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers').default;
      const nextPersistedReducer = persistReducer(
        persistConfig,
        nextRootReducer()
      );
      store.replaceReducer((nextPersistedReducer: any));
    });
  }

  const persistor = persistStore(store);
  return { store, persistor };
}

export type StoreConfiguration = {
  store: Store<ApplicationState>,
  persistor: any,
};
