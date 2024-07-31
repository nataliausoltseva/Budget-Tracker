import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IncomePage from './src/pages/IncomePage/IncomePage';
import BudgetPage from './src/pages/BudgetPage/BudgetPage';
import SavingGoalsPage from './src/pages/SavingGoalsPage/SavingGoalsPage';
import TopNavigationBar from './src/components/TopNavigationBar';
import { AppContextProvider } from './src/context/AppContext';
import InvestmentPage from './src/pages/InvestmentPage/InvestmentPage';
import DarkModeToggle from './src/components/DarkModeToggle';
import HistoryIcon from './src/components/HistoryIcon';
import Button from './src/components/Button';


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
  const [incomeData, setIncomeData] = useState<IncomeHistoryItem[]>([]);
  const [budgetData, setBudgetData] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState('');

  useEffect(() => {
    getIncomeData();
    getBudgetData();
  }, [showHistoryModal]);

  useEffect(() => {
    if ((TABS[selectedIndex].key === 'budget' && budgetData.length === 0) ||
      (TABS[selectedIndex].key === 'icnome' && incomeData.length === 0)
    ) {
      setShowHistoryModal("");
    }
  }, [incomeData, budgetData, selectedIndex]);

  const getIncomeData = async () => {
    const data = await AsyncStorage.getItem('incomeData');
    setIncomeData(data === null ? [] : JSON.parse(data));
  }

  const getBudgetData = async () => {
    const data = await AsyncStorage.getItem('budgetData');
    setBudgetData(data === null ? [] : JSON.parse(data));
  }

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

  const onDeleteStorageItem = (id: number) => {
    const updateStorage = async (list: any[], key: string) => {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    }

    if (TABS[selectedIndex].key === 'income') {
      const itemIndex = incomeData.findIndex(item => item.id === id);
      updateStorage(budgetData.length === 1 ? [] : budgetData.splice(itemIndex, 1), 'incomeData');
      getIncomeData();
    } else {
      const itemIndex = incomeData.findIndex(item => item.id === id);
      updateStorage(budgetData.length === 1 ? [] : budgetData.splice(itemIndex, 1), 'budgetData');
      getBudgetData();
    }
  }

  const onSaveHistory = () => {
    if (TABS[selectedIndex].key === 'income') {
      getIncomeData();
    } else {
      getBudgetData();
    }
  }

  const hasHistoryButton = (TABS[selectedIndex].key === 'income' && incomeData.length > 0) ||
    (TABS[selectedIndex].key === 'budget' && budgetData.length > 0);

  return (
    <SafeAreaView>
      <AppContextProvider>
        <SafeAreaView style={{ backgroundColor: isDarkMode ? '#443472' : "white", height: "100%" }}>
          <TopNavigationBar tabs={TABS} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
          <ScrollView style={{ margin: 20, flexGrow: 1 }}>
            <IncomePage
              isHidden={TABS[selectedIndex].key !== 'income'}
              showHistoryModal={showHistoryModal === 'income'}
              storageData={incomeData}
              onCloseModal={() => setShowHistoryModal('')}
              onDeleteStorageItem={onDeleteStorageItem}
              onSaveHistory={getIncomeData}
            />
            <BudgetPage
              isHidden={TABS[selectedIndex].key !== 'budget'}
              showHistoryModal={showHistoryModal === 'budget'}
              storageData={budgetData}
              onCloseHistoryModal={() => setShowHistoryModal('')}
              onDeleteStorageItem={onDeleteStorageItem}
              onSaveHistory={getBudgetData}
            />
            <SavingGoalsPage isHidden={TABS[selectedIndex].key !== 'savingGoals'} />
            <InvestmentPage isHidden={TABS[selectedIndex].key !== 'investment'} />
          </ScrollView>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: hasHistoryButton ? "space-between" : 'flex-end', alignItems: "center" }}>
            {hasHistoryButton && (
              <Button
                containerStyle={{ flexDirection: "row", padding: 8, marginLeft: 10, borderRadius: 2 }}
                onPress={() => setShowHistoryModal(TABS[selectedIndex].key)}
                Icon={HistoryIcon}
                label='OLD CALCULATIONS'
              />
            )}
            <DarkModeToggle onToggle={onModeChange} />
          </View>
        </SafeAreaView>
      </AppContextProvider>
    </SafeAreaView >
  );
}

export default App;
