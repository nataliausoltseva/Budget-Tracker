import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Button, IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import usePieChart from '../hooks/usePieChart';
import { ExpenseItem } from '../BudgetPage';

type Props = {
    expenses: ExpenseItem[],
    onAddToSavings: (amount: number, selectedIndex: IndexPath | IndexPath[]) => void
}

const CHART_FREQUENCY: FrequencyItem[] = [
    {
        name: "Week",
        key: 'week',
        calcToYear: 52
    },
    {
        name: "Fortnight",
        key: 'fortnight',
        calcToYear: 26
    },
    {
        name: "Month",
        key: 'month',
        calcToYear: 12
    },
    {
        name: "Year",
        key: 'year',
        calcToYear: 1
    },
];

const PieChartWithSelection = ({ expenses, onAddToSavings }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const frequency: FrequencyItem = CHART_FREQUENCY[selectedIndex.row];
    const {
        pieData,
        leftOver
    } = usePieChart({ expenses, frequency });

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
                <PieChart
                    data={pieData}
                    labelsPosition='outward'
                    textColor='white'
                    fontWeight='bold'
                    innerRadius={60}
                    innerCircleColor={'#232B5D'}
                    centerLabelComponent={() => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                                ${Number(leftOver).toFixed(2)}
                            </Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>Left from income</Text>
                        </View>
                    )}
                />
                <View style={{ alignItems: "flex-start" }}>
                    {pieData.map((item: ExpenseItem, index: number) => (
                        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center' }} key={item.id + "-" + index}>
                            <View style={{ backgroundColor: item.color, width: 12, height: 12, borderRadius: 50, marginRight: 10, borderColor: 'white', borderWidth: 1 }} />
                            <Text key={item.id} style={{ flexWrap: "wrap", maxWidth: 200 }}>{item.name}: ${Number(item.value).toFixed(2)}</Text>
                        </SafeAreaView>
                    ))}
                </View>
            </View>
            <View style={{ flexGrow: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <Layout level='1'>
                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={setSelectedIndex}
                        value={CHART_FREQUENCY[selectedIndex.row].name}
                    >
                        {CHART_FREQUENCY.map((item: FrequencyItem) => (
                            <SelectItem title={item.name} key={item.name} />
                        ))}
                    </Select>
                </Layout>
                <Button onPress={() => onAddToSavings(leftOver, new IndexPath(selectedIndex.row + 1))} disabled={leftOver <= 0} status="success">Add to savings</Button>
            </View>
        </View>
    )
}

export default PieChartWithSelection;