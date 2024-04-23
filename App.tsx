/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';


import Input from './src/components/Input';
import IncomePage from './src/pages/IncomePage/IncomePage';

function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <IncomePage />
    </SafeAreaView>
  );
}

export default App;
