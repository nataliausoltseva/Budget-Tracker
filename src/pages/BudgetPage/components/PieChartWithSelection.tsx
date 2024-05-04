import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import usePieChart from '../hooks/usePieChart';
import { ExpenseItem } from '../BudgetPage';

type Props = {
    expenses: ExpenseItem[]
}

const CHART_FREQUENCY: PieChartitem[] = [
    {
        label: "Week",
        calcFromYear: 52
    },
    {
        label: "Fortnight",
        calcFromYear: 26
    },
    {
        label: "Month",
        calcFromYear: 12
    },
    {
        label: "Year",
        calcFromYear: 1
    },
];

const PieChartWithSelection = ({ expenses }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

    const {
        getPieData
    } = usePieChart({ expenses });

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
                <PieChart
                    data={getPieData(CHART_FREQUENCY[selectedIndex.row].calcFromYear)}
                    labelsPosition='outward'
                    textColor='white'
                    fontWeight='bold'
                    showValuesAsLabels
                    showText
                />
                <View style={{ alignItems: "flex-start" }}>
                    {expenses.map((item: ExpenseItem) => (
                        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center' }} key={item.id}>
                            <View style={{ backgroundColor: item.color, width: 12, height: 12, borderRadius: 50, marginRight: 10, borderColor: 'white', borderWidth: 1 }} />
                            <Text key={item.id} style={{ flexWrap: "wrap", maxWidth: 200 }}>{item.name}</Text>
                        </SafeAreaView>
                    ))}
                </View>
            </View>
            <Layout level='1' style={{ flexGrow: 1, height: 0 }}>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    value={CHART_FREQUENCY[selectedIndex.row].label}
                >
                    {CHART_FREQUENCY.map((item: PieChartitem) => (
                        <SelectItem title={item.label} key={item.label} />
                    ))}
                </Select>
            </Layout>
        </View>
    )
}

export default PieChartWithSelection;