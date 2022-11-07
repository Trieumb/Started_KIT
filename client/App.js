/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './src/screens/Index';
import { Provider } from 'react-redux';
import {store, persistor } from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};


export default App;
