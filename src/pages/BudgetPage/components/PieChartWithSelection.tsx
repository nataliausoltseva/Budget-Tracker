import React, { useContext, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import usePieChart from '../hooks/usePieChart';
import { ExpenseItem } from '../BudgetPage';
import Dropdown from '../../../components/Dropdown';
import CustomText from '../../../components/CustomText';
import { AppContext } from '../../../context/AppContext';

type Props = {
    expenses: ExpenseItem[],
    onAddToSavings: (amount: number, frequency: FrequencyItem) => void
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
    const appState = useContext(AppContext);
    const [frequency, setFrequency] = useState(CHART_FREQUENCY[0]);
    const {
        pieData,
        leftOver
    } = usePieChart({ expenses, frequency });

    const onFrequencySelect = (index: number) => {
        setFrequency(CHART_FREQUENCY[index]);
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
                <PieChart
                    data={pieData}
                    labelsPosition='outward'
                    textColor={appState.isDarkMode ? "white" : "black"}
                    fontWeight='bold'
                    innerRadius={60}
                    innerCircleColor={appState.isDarkMode ? "#443472" : 'white'}
                    centerLabelComponent={() => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <CustomText
                                style={{ fontSize: 16, fontWeight: 'bold' }}>
                                ${Number(leftOver).toFixed(2)}
                            </CustomText>
                            <CustomText style={{ fontSize: 14 }}>Left from income</CustomText>
                        </View>
                    )}
                />
                <View style={{ alignItems: "flex-start" }}>
                    {pieData.map((item: ExpenseItem, index: number) => (
                        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center' }} key={item.id + "-" + index}>
                            <View style={{ backgroundColor: item.color, width: 12, height: 12, borderRadius: 50, marginRight: 10, borderColor: 'white', borderWidth: 1 }} />
                            <CustomText key={item.id} style={{ flexWrap: "wrap", maxWidth: 200 }}>{item.name}: ${Number(item.value).toFixed(2)}</CustomText>
                        </SafeAreaView>
                    ))}
                </View>
            </View>
            <View style={{ flexGrow: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <Dropdown
                    onSelect={onFrequencySelect}
                    value={frequency.name}
                    list={CHART_FREQUENCY.map(value => value.name)}
                    listStyle={{
                        width: 150,
                        left: 260,
                        top: 112,
                    }}
                    containerStyle={{
                        width: 150
                    }}
                />
                <Button
                    onPress={() => onAddToSavings(leftOver, frequency)}
                    disabled={leftOver <= 0}
                    title={"Add to savings"}
                    color={"#59AE59"}
                />
            </View>
        </View>
    )
}

export default PieChartWithSelection;