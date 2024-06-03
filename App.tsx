import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text, Toggle } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import IncomePage from './src/pages/IncomePage/IncomePage';
import BudgetPage from './src/pages/BudgetPage/BudgetPage';
import SavingGoalsPage from './src/pages/SavingGoalsPage/SavingGoalsPage';
import TopNavigationBar from './src/components/TopNavigationBar';
import { AppContextProvider } from './src/context/AppContext';
import InvestmentPage from './src/pages/InvestmentPage/InvestmentPage';

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
  },
  {
    label: "Investments",
    key: "investment"
  }
];

function App(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
        <SafeAreaView style={{ height: "100%" }}>
          <TopNavigationBar tabs={TABS} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
          <View style={{ flexGrow: 1, marginTop: 20 }}>
            <AppContextProvider>
              <IncomePage isHidden={TABS[selectedIndex].key !== 'income'} />
              <BudgetPage isHidden={TABS[selectedIndex].key !== 'budget'} />
              <SavingGoalsPage isHidden={TABS[selectedIndex].key !== 'savingGoals'} />
              <InvestmentPage isHidden={TABS[selectedIndex].key !== 'investment'} />
            </AppContextProvider>
          </View>
          <View style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text>Dark mode</Text>
              <Toggle
                checked={isDarkMode}
                onChange={setIsDarkMode}
              />
            </View>
          </View>
        </SafeAreaView >
      </ApplicationProvider>
    </SafeAreaView >
  );
}

export default App;
