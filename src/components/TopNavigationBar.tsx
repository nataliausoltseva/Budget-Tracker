import { TabBar, Text } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

type Props = {
    tabs: PanelTab[],
    onSelect: (index: number) => void,
    selectedIndex: number,
}

const TopNavigationBar = ({ tabs, onSelect, selectedIndex }: Props) => {
    const appState = useContext(AppContext);

    return (
        <TabBar
            selectedIndex={selectedIndex}
            style={{ backgroundColor: appState.isDarkMode ? '#443472' : "white" }}
            indicatorStyle={{ backgroundColor: getTabColor(appState.isDarkMode, true) }}
        >
            {tabs.map((tab: PanelTab, index: number) => (
                <Text
                    style={{ color: getTabColor(appState.isDarkMode, selectedIndex === index), height: 40, paddingTop: 10, textAlign: "center" }}
                    onPress={() => onSelect(index)}
                >
                    {tab.label}
                </Text>
            ))}
        </TabBar>
    )
};

export default TopNavigationBar;

const getTabColor = (isDarkMode: boolean, isSelected: boolean) => {
    if (isDarkMode) {
        return isSelected ? "#A78DFF" : "white";
    }

    return isSelected ? "#01B0E6" : "black"
}

