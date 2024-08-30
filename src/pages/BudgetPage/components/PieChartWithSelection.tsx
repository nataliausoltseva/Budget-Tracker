import React, { useContext, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import usePieChart from '../hooks/usePieChart';
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

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row'
        },
        pieContainer: {
            alignItems: 'center'
        },
        pieLabel: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        labelText: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        subLabelText: {
            fontSize: 14
        },
        listContainer: {
            alignItems: "flex-start"
        },
        itemWrapper: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        itemIndicator: {
            width: 12,
            height: 12,
            borderRadius: 50,
            marginRight: 10,
            borderColor: 'white',
            borderWidth: 1
        },
        itemLabel: {
            flexWrap: "wrap",
            maxWidth: 200
        },
        actions: {
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "space-between"
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.pieContainer}>
                <PieChart
                    data={pieData}
                    labelsPosition='outward'
                    textColor={appState.isDarkMode ? "white" : "black"}
                    fontWeight='bold'
                    innerRadius={60}
                    innerCircleColor={appState.isDarkMode ? "#443472" : 'white'}
                    centerLabelComponent={() => (
                        <View style={styles.pieLabel}>
                            <CustomText style={styles.labelText}>
                                ${Number(leftOver).toFixed(2)}
                            </CustomText>
                            <CustomText style={styles.subLabelText}>Left from income</CustomText>
                        </View>
                    )}
                />
                <View style={styles.listContainer}>
                    {pieData.map((item: ExpenseItem, index: number) => (
                        <SafeAreaView style={styles.itemWrapper} key={item.id + "-" + index}>
                            <View style={[styles.itemIndicator, { backgroundColor: item.color }]} />
                            <CustomText key={item.id} style={styles.itemLabel}>{item.name}: ${Number(item.value).toFixed(2)}</CustomText>
                        </SafeAreaView>
                    ))}
                </View>
            </View>
            <View style={styles.actions}>
                <Dropdown
                    onSelect={onFrequencySelect}
                    value={frequency.name}
                    list={CHART_FREQUENCY.map(value => value.name)}
                    width={150}
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