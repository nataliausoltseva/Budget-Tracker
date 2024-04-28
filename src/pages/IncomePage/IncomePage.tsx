import React, { useRef, useState } from 'react';
import { FlatList, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import { incomePeriods } from '../../constants';
import { ApplicationProvider, Button, CheckBox, IndexPath, Input, Layout, List, ListItem, Select, SelectItem } from '@ui-kitten/components';
import KiwiSaverForm from './components/KiwiSaverForm';
import StudentLoanForm from './components/StudentLoanForm';
import SecondaryIncomeForm from './components/SecondaryIncomeForm';
import useIncome from './hooks/useIncome';
import useTable from './hooks/useTable';

const IncomePage = () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const primaryIncomeHolder = useRef("");

    const {
        primaryIncome,
        incomePeriod,
        hasKiwiSaver,
        hasSecondaryIncome,
        hasStudentLoan,
        kiwiSaverOption,
        isKiwiSaverCustom,
        studentLoanRate,
        studentLoanThreshold,
        secondaryIncome,
        yearGrossPay,
        yearPaye,
        yearAcc,
        yearKiwiSaver,
        yearStudentLoan,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onKiwiSaverChange,
        onStudentLoanChange,
        setHasSecondaryIncome,
        setHasStudentLoan,
        setHasKiwiSaver,
        setIsKiwiSaverCustom,
        setSecondaryIncome,
    } = useIncome();

    const {
        onCalculate,
    } = useTable({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan });

    const onIncomeAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        primaryIncomeHolder.current = e.nativeEvent.text || "";

        if (primaryIncomeHolder.current) {
            onPrimaryIncomeChange(parseFloat(primaryIncomeHolder.current));
        } else if (!e.nativeEvent.text) {
            onPrimaryIncomeChange(0);
        }
    }

    const onPreiodSelect = (index: IndexPath | IndexPath[]) => {
        onIncomePeriodChange(incomePeriods[index.row]);
    }

    return (
        <SafeAreaView>
            <Text>Your Income</Text>
            <View style={styles.incomeView}>
                <Input
                    placeholder={"Income amount"}
                    value={primaryIncomeHolder.current}
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
                        onSelect={onPreiodSelect}
                        value={incomePeriod.label}
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
            {hasKiwiSaver && (
                <KiwiSaverForm
                    option={kiwiSaverOption}
                    setKiwiSaverOption={onKiwiSaverChange}
                    isCustom={isKiwiSaverCustom}
                    setIsCustom={setIsKiwiSaverCustom}
                />
            )}
            <CheckBox
                checked={hasStudentLoan}
                onChange={nextChecked => setHasStudentLoan(nextChecked)}
            >
                Student Loan
            </CheckBox>
            {hasStudentLoan && (
                <StudentLoanForm
                    rate={studentLoanRate}
                    threshold={studentLoanThreshold}
                    setRate={(rate: number) => onStudentLoanChange(rate, null)}
                    setThreshold={(threshold: number) => onStudentLoanChange(null, threshold)}
                />
            )}
            <CheckBox
                checked={hasSecondaryIncome}
                onChange={nextChecked => setHasSecondaryIncome(nextChecked)}
            >
                Secondary Income
            </CheckBox>
            {hasSecondaryIncome && (
                <SecondaryIncomeForm
                    income={secondaryIncome}
                    setIncome={setSecondaryIncome}
                />
            )}
            <Button onPress={onCalculate} disabled={primaryIncome === 0}>
                Calculate
            </Button>
            {/* If this works fine, then we can show the value */}
            <List
                style={styles.container}
                data={["one", "two", "three", "four"]}
                renderItem={({ item, index }: { item: string; index: number }): React.ReactElement => (
                    <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                        <ListItem title={item} style={{ flexGrow: 1 }} />
                    </View>
                )}
            />
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
    },
    row: {
        color: "red",
    }
});

export default IncomePage;