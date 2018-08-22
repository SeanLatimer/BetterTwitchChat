// @flow strict

import * as React from 'react';
import { type Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { type ApplicationState } from '../../store/state';
import App from '../../containers/App';

type WrapperProps = {
  store: Store<ApplicationState, any>,
  persistor: any,
  history: any,
};

const Wrapper = (props: WrapperProps) => {
  const { store, persistor, history } = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route component={App} />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
