import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import IncomePage from './src/pages/IncomePage/IncomePage';
import BudgetPage from './src/pages/BudgetPage/BudgetPage';
import SavingGoalsPage from './src/pages/SavingGoalsPage';
import TopNavigationBar from './src/components/TopNavigationBar';

const TABS: PanelTab[] = [
  {
    label: "Income",
    key: "income"
  },
  {
    label: "Budget",
    key: 'budget'
  },
  {
    label: "Saving Goals",
    key: "savingGoals"
  }
];

function App(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView>
      <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
        <SafeAreaView style={{ height: "100%" }}>
          <TopNavigationBar tabs={TABS} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
          <View style={{ flexGrow: 1, marginTop: 20 }}>
            <IncomePage isHidden={TABS[selectedIndex].key !== 'income'} />
            <BudgetPage isHidden={TABS[selectedIndex].key !== 'budget'} />
            <SavingGoalsPage isHidden={TABS[selectedIndex].key !== 'savingGoals'} />
          </View>
        </SafeAreaView >
      </ApplicationProvider>
    </SafeAreaView >
  );
}

export default App;
