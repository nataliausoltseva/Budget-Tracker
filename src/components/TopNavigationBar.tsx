import { Tab, TabBar } from '@ui-kitten/components';
import React from 'react';

type Props = {
    tabs: PanelTab[],
    onSelect: (index: number) => void,
    selectedIndex: number,
}

const TopNavigationBar = ({ tabs, onSelect, selectedIndex }: Props) => (
    <TabBar selectedIndex={selectedIndex} onSelect={onSelect}>
        {tabs.map((tab: PanelTab) => (
            <Tab title={tab.label} key={tab.label} style={{ height: 40 }} />
        ))}
    </TabBar>
);

export default TopNavigationBar;