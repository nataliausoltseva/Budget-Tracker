import React, { useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import { incomePeriods } from '../../constants';
import { ApplicationProvider, CheckBox, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';

const IncomePage = () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [incomeAmount, setIncomeAmount] = useState("");
    const [hasKiwiSaver, setHasKiwiSaver] = useState(false);
    const [hasStudnetLoan, setHasStudentLoan] = useState(false);
    const [hasSecondaryIncome, setHasSecondaryIncome] = useState(false);

    const onIncomeAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setIncomeAmount(e.nativeEvent.text);
    }

    return (
        <SafeAreaView>
            <Text>Your Income</Text>
            <View style={styles.incomeView}>
                <Input
                    placeholder={"Income amount"}
                    value={incomeAmount}
                    onChange={onIncomeAmountChange}
                    style={styles.input}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
                <Text style={styles.dollarSign}>$</Text>
                <Layout style={styles.container} level='1'>
                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}
                        value={incomePeriods[selectedIndex.row].label}
                    >
                        {incomePeriods.map((period: IncomePeriod) => (
                            <SelectItem title={period.label} key={period.value} />
                        ))}
                    </Select>
                </Layout>
            </View>
            <CheckBox
                checked={hasKiwiSaver}
                onChange={nextChecked => setHasKiwiSaver(nextChecked)}
            >
                KiwiSaver
            </CheckBox>
            <CheckBox
                checked={hasStudnetLoan}
                onChange={nextChecked => setHasStudentLoan(nextChecked)}
            >
                Student Loan
            </CheckBox>
            <CheckBox
                checked={hasSecondaryIncome}
                onChange={nextChecked => setHasSecondaryIncome(nextChecked)}
            >
                Student Loan
            </CheckBox>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    incomeView: {
        display: "flex",
        flexDirection: 'row',
        position: "relative"
    },
    container: {
        minWidth: 150
    },
    input: {
        flexGrow: 1
    },
    dollarSign: {
        position: "absolute",
        zIndex: 5,
        color: "red",
        top: "28%",
        left: "2%",
    }
});

export default IncomePage;