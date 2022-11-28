/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import RootComponent from './src/navigation/index';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};


export default App;
