import React from 'react';

import { SafeAreaView } from 'react-native';
import * as eva from '@eva-design/eva';

import IncomePage from './src/pages/IncomePage/IncomePage';
import { ApplicationProvider } from '@ui-kitten/components';

function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
        <IncomePage />
      </ApplicationProvider>
    </SafeAreaView >
  );
}

export default App;
