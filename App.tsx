import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import IncomePage from './src/pages/IncomePage/IncomePage';
import BudgetPage from './src/pages/BudgetPage/BudgetPage';
import SavingGoalsPage from './src/pages/SavingGoalsPage/SavingGoalsPage';
import TopNavigationBar from './src/components/TopNavigationBar';
import { AppContextProvider } from './src/context/AppContext';
import InvestmentPage from './src/pages/InvestmentPage/InvestmentPage';
import DarkModeToggle from './src/components/DarkModeToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const onModeChange = (value?: boolean | null) => {
    if (value && value !== null) {
      setIsDarkMode(value);
    } else {
      setIsDarkMode(prevState => {
        async function setMode() {
          await AsyncStorage.setItem('isDarkMode', (!prevState).toString());
        }

        setMode();
        return !prevState
      });
    }
  }

  return (
    <SafeAreaView>
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <AppContextProvider>
          <SafeAreaView style={{ backgroundColor: isDarkMode ? '#443472' : "white", height: "100%" }}>
            <TopNavigationBar tabs={TABS} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
            <View style={{ flexGrow: 1, padding: 20 }}>
              <IncomePage isHidden={TABS[selectedIndex].key !== 'income'} />
              <BudgetPage isHidden={TABS[selectedIndex].key !== 'budget'} />
              <SavingGoalsPage isHidden={TABS[selectedIndex].key !== 'savingGoals'} />
              <InvestmentPage isHidden={TABS[selectedIndex].key !== 'investment'} />
            </View>
            <DarkModeToggle onToggle={onModeChange} />
          </SafeAreaView>
        </AppContextProvider>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

export default App;
