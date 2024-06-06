import React, { useContext, useRef, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import { Button, CheckBox, IndexPath, Input, Layout, ListItem, Select, SelectItem, Toggle } from '@ui-kitten/components';

import { CURRENCIES, incomePeriods } from '../../constants';
import KiwiSaverForm from './components/KiwiSaverForm';
import StudentLoanForm from './components/StudentLoanForm';
import SecondaryIncomeForm from './components/SecondaryIncomeForm';
import useIncome from './hooks/useIncome';
import useTable, { HEADERS, RowIndicator } from './hooks/useTable';
import { AppContext } from '../../context/AppContext';
import { PieChart } from 'react-native-gifted-charts';
import usePieChart from './hooks/usePieChart';

type Props = {
    isHidden: boolean,
}

const COLORS: string[] = ["#f6abb6", "#b3cde0", "#851e3e", "#3da4ab", "#4b86b4", "#fec8c1", "#83d0c9", " #e0a899", "#8b9dc3"];

const IncomePage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

    // The list (table) only updates if we pass something new to the extraData prop.
    const [, setRandom] = useState(Math.random());

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
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onKiwiSaverChange,
        onStudentLoanChange,
        setHasSecondaryIncome,
        setHasStudentLoan,
        setHasKiwiSaver,
        setIsKiwiSaverCustom,
        setSecondaryIncome,
        calculateYearlyValues,
    } = useIncome();

    const {
        populateTableRows,
        rows,
        setRows,
        isSimpleTable,
        setIsSimpleTable,
    } = useTable();

    const {
        pieData,
        populateData
    } = usePieChart();

    const onIncomeAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        primaryIncomeHolder.current = e.nativeEvent.text || "";

        if (primaryIncomeHolder.current) {
            onPrimaryIncomeChange(parseFloat(primaryIncomeHolder.current));
        } else if (!e.nativeEvent.text) {
            onPrimaryIncomeChange(0);
        }
    }

    const onPreiodSelect = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);

        if (index instanceof IndexPath) {
            onIncomePeriodChange(incomePeriods[index.row]);
        }
    }

    const {
        yearGrossPay,
        yearPaye,
        yearAcc,
        yearKiwiSaver,
        yearStudentLoan,
        yearSecGrossPay,
        yearSecPaye,
    } = calculateYearlyValues();

    const onCalculate = () => {
        appState?.setTotalIncome(yearGrossPay + yearSecGrossPay - yearPaye - yearAcc - (hasKiwiSaver ? yearKiwiSaver : 0) - (hasStudentLoan ? yearStudentLoan : 0) - yearSecPaye);
        populateTableRows({
            yearGrossPay,
            yearPaye,
            yearAcc,
            yearKiwiSaver: hasKiwiSaver ? yearKiwiSaver : 0,
            yearStudentLoan: hasStudentLoan ? yearStudentLoan : 0,
            yearSecGrossPay: hasSecondaryIncome ? yearSecGrossPay : 0,
            yearSecPaye: hasSecondaryIncome ? yearSecPaye : 0
        })
        setRandom(Math.random());
        populateData({
            yearPaye,
            yearAcc,
            yearKiwiSaver: hasKiwiSaver ? yearKiwiSaver : 0,
            yearStudentLoan: hasStudentLoan ? yearStudentLoan : 0,
            yearSecPaye: hasSecondaryIncome ? yearSecPaye : 0,
            colors: COLORS,
        });
    }

    const updateTableRows = (isChecked: boolean) => {
        const newRows = [...rows];
        newRows.forEach((row: RowIndicator) => {
            if (!row.isSimple) {
                // Only hide all other rows if simple toggle is selectec OR the rows are empty and should be hidden by default.
                row.isHidden = isChecked || (row.hideWhenEmpty && row.values.every(v => v === 0));
            }
        })

        setRows(rows);
        setRandom(Math.random());
        setIsSimpleTable(isChecked);
    }

    const selectedCurrency = selectedCurrencyIndex instanceof IndexPath ? CURRENCIES[selectedCurrencyIndex.row] : CURRENCIES[0];

    return (
        <ScrollView style={{ display: isHidden ? "none" : "flex" }}>
            <Text>Your Income</Text>
            <View style={styles.incomeView}>
                <Layout style={styles.currencyContainer} level='1'>
                    <Select
                        selectedIndex={selectedCurrencyIndex}
                        onSelect={setSelectedCurrencyIndex}
                        value={selectedCurrency}
                    >
                        {CURRENCIES.map((currency: string) => (
                            <SelectItem title={currency} key={currency} />
                        ))}
                    </Select>
                </Layout>
                <Input
                    placeholder={"Income amount"}
                    value={primaryIncomeHolder.current}
                    onChange={onIncomeAmountChange}
                    style={styles.input}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
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
            <View style={{ flexGrow: 1, width: "100%" }}>
                {new Array(rows.length + 1).fill(0).map((_, index) => (
                    <View key={index} style={{ position: "relative", display: "flex", flexDirection: "row" }}>
                        {index === 0 ? (
                            HEADERS.map((header: string) => (
                                <ListItem title={header} style={{ flexGrow: 1 }} key={header || 'header-0'} />
                            ))
                        ) : (
                            !rows[index - 1].isHidden && (
                                <>
                                    <View style={{ position: "absolute", left: 5, top: "45%", width: 5, height: 5, backgroundColor: COLORS[index - 1], zIndex: 1, borderRadius: 50 }} />
                                    <ListItem title={rows[index - 1].label} style={{ flexGrow: 1 }} key={rows[index - 1].label} />
                                    {rows[index - 1].values.map((value: number, valuIndex: number) => (
                                        <ListItem title={value || "0"} style={{ flexGrow: 1 }} key={`${rows[index - 1].label}-${valuIndex}`} />
                                    ))}

                                </>
                            )
                        )}
                    </View>
                ))}
            </View>
            <Toggle
                checked={isSimpleTable}
                onChange={updateTableRows}
            >
                Simple table
            </Toggle>
            <PieChart
                data={pieData}
                labelsPosition='outward'
                textColor='white'
                fontWeight='bold'
                innerRadius={60}
                innerCircleColor={'#232B5D'}
                showText
                centerLabelComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                            ${Number(yearGrossPay).toFixed(2)}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'white' }}>Gross Pay</Text>
                    </View>
                )}
            />
        </ScrollView>
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
    currencyContainer: {
        minWidth: 110
    },
    input: {
        flexGrow: 1
    },
    row: {
        color: "red",
    }
});

export default IncomePage;