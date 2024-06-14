import React, { memo, useContext, useRef, useState } from 'react';
import { Animated, Easing, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { Button, IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

import { CURRENCIES, incomePeriods } from '../../constants';
import useIncome, { COLORS } from './hooks/useIncome';
import useTable from './hooks/useTable';
import { AppContext } from '../../context/AppContext';
import usePieChart from './hooks/usePieChart';
import CustomToggle from '../../components/CustomToggle';
import FilterIcon from '../../components/FilterIcon';
import IncomeTable from './components/IncomeTable';
import IncomePieChart from './components/IncomePieChart';
import FilterModal from './components/FilterModal';
import { getMainColour } from '../../hooks/color';
import CustomInput from '../../components/CustomInput';
import Dropdown from '../../components/Dropdown';

type Props = {
    isHidden: boolean,
}

const IncomePage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
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

    const rotateValue = useRef(new Animated.Value(0)).current;
    const positionInterPol = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "90deg"] });

    const onShowFilter = () => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setShowFilter(true)
    }

    const onCloseFilter = () => {
        if (!hasKiwiSaver && !hasSecondaryIncome && !hasStudentLoan) {
            Animated.timing(rotateValue, {
                toValue: 0,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
        setShowFilter(false)
    }

    const selectedCurrency = selectedCurrencyIndex instanceof IndexPath ? CURRENCIES[selectedCurrencyIndex.row] : CURRENCIES[0];

    return (
        <ScrollView style={{ display: isHidden ? "none" : "flex" }}>
            <View style={styles.incomeView}>
                <Dropdown
                    onSelect={setSelectedCurrencyIndex}
                    value={selectedCurrency}
                    list={CURRENCIES}
                    style={{
                        width: 110
                    }}
                />
                <CustomInput
                    value={primaryIncomeHolder.current}
                    onChange={onIncomeAmountChange}
                    style={styles.input}
                    isNumeric
                />
                <Dropdown
                    onSelect={onPreiodSelect}
                    value={incomePeriod.label}
                    list={incomePeriods}
                    style={{
                        width: 150
                    }}
                />
                <View>
                    <Animated.View style={{ transform: [{ rotate: positionInterPol }] }}>
                        <FilterIcon
                            onPress={onShowFilter}
                            color={getMainColour(appState.isDarkMode, hasKiwiSaver || hasSecondaryIncome || hasSecondaryIncome)}
                        />
                    </Animated.View>
                    {showFilter && (
                        <FilterModal
                            onClose={onCloseFilter}
                            hasKiwiSaver={hasKiwiSaver}
                            setHasKiwiSaver={setHasKiwiSaver}
                            kiwiSaverOption={kiwiSaverOption}
                            onKiwiSaverChange={onKiwiSaverChange}
                            hasStudentLoan={hasStudentLoan}
                            setHasStudentLoan={setHasStudentLoan}
                            studentLoanRate={studentLoanRate}
                            studentLoanThreshold={studentLoanThreshold}
                            onStudentLoanChange={onStudentLoanChange}
                            hasSecondaryIncome={hasSecondaryIncome}
                            setHasSecondaryIncome={setHasSecondaryIncome}
                            secondaryIncome={secondaryIncome}
                            setSecondaryIncome={setSecondaryIncome}
                        />

                    )}
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button onPress={onCalculate} disabled={primaryIncome === 0} style={{ width: 150 }}>
                    Calculate
                </Button>
            </View>
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
        position: "relative",
        justifyContent: "space-between"
    },
    input: {
        width: 100
    },
});

export default memo(IncomePage);
