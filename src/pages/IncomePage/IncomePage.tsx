import React, { memo, useContext, useRef, useState } from 'react';
import { Modal, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { Button, Card, CheckBox, IndexPath, Input, Layout, ListItem, Select, SelectItem, Text, Toggle } from '@ui-kitten/components';

import { CURRENCIES, incomePeriods } from '../../constants';
import KiwiSaverForm from './components/KiwiSaverForm';
import StudentLoanForm from './components/StudentLoanForm';
import SecondaryIncomeForm from './components/SecondaryIncomeForm';
import useIncome, { COLORS } from './hooks/useIncome';
import useTable from './hooks/useTable';
import { AppContext } from '../../context/AppContext';
import { PieChart } from 'react-native-gifted-charts';
import usePieChart from './hooks/usePieChart';
import CustomToggle from '../../components/CustomToggle';
import FilterIcon from '../../components/FilterIcon';
import IncomeTable from './components/IncomeTable';
import IncomePieChart from './components/IncomePieChart';
import CustomModal from '../../components/CustomModal';
import FilterPopover from './components/FilterPopver';

type Props = {
    isHidden: boolean,
}

const IncomePage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [showFilter, setShowFilter] = useState(false);

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

    const updateTableRows = () => {
        const newRows = [...rows];
        const newValue = !isSimpleTable;
        newRows.forEach((row: RowIndicator) => {
            if (!row.isSimple) {
                // Only hide all other rows if simple toggle is selectec OR the rows are empty and should be hidden by default.
                row.isHidden = newValue || (row.hideWhenEmpty && row.values.every(v => v === 0));
            }
        })
        setIsSimpleTable(prevState => !prevState);
        setRows(rows);
        setRandom(Math.random());

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
                <View>
                    <FilterIcon onPress={() => setShowFilter(true)} />
                    {showFilter && (
                        <CustomModal onClose={() => setShowFilter(false)} isVisible={true}>
                            <Text>Test</Text>
                        </CustomModal>
                    )}
                </View>
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
            <IncomeTable rows={rows} />
            <CustomToggle label={"Simple table"} isChecked={isSimpleTable} onChange={updateTableRows} />
            <IncomePieChart pieData={pieData} yearGrossPay={yearGrossPay} />
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

export default memo(IncomePage);