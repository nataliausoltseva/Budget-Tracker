import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { CheckBox } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CURRENCIES, incomePeriods } from '../../constants';
import useIncome, { COLORS } from './hooks/useIncome';
import useTable, { HEADERS } from './hooks/useTable';
import { AppContext } from '../../context/AppContext';
import usePieChart from './hooks/usePieChart';
import FilterIcon from '../../components/FilterIcon';
import IncomeTable from './components/IncomeTable';
import IncomePieChart from './components/IncomePieChart';
import FilterModal from './components/FilterModal';
import { getMainColour } from '../../hooks/color';
import CustomInput from '../../components/CustomInput';
import Dropdown from '../../components/Dropdown';
import CustomModal from '../../components/CustomModal';

type Props = {
    isHidden: boolean,
}

const IncomePage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [selectedCurrency, setSelecctedCurrency] = useState<string>(CURRENCIES[0]);
    const [showFilter, setShowFilter] = useState(false);
    const [tableHeader, setTableHeader] = useState<IncomeTableHeader>(HEADERS[1]);
    const [hasCalculated, setHasCalculated] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [dataLabel, setDataLabel] = useState(new Date().toLocaleDateString());

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

    const onPreiodSelect = (index: number) => {
        onIncomePeriodChange(incomePeriods[index]);
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

    const onCalculate = (tableHeader: IncomeTableHeader) => {
        setHasCalculated(true);
        appState?.setTotalIncome(yearGrossPay + yearSecGrossPay - yearPaye - yearAcc - (hasKiwiSaver ? yearKiwiSaver : 0) - (hasStudentLoan ? yearStudentLoan : 0) - yearSecPaye);
        populateTableRows({
            yearGrossPay,
            yearPaye,
            yearAcc,
            yearKiwiSaver: hasKiwiSaver ? yearKiwiSaver : 0,
            yearStudentLoan: hasStudentLoan ? yearStudentLoan : 0,
            yearSecGrossPay: hasSecondaryIncome ? yearSecGrossPay : 0,
            yearSecPaye: hasSecondaryIncome ? yearSecPaye : 0,
            tableHeader,
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
                // Only hide all other rows if simple toggle is selected OR the rows are empty and should be hidden by default.
                row.isHidden = newValue || (row.hideWhenEmpty && row.value === 0);
            }
        })
        setIsSimpleTable(prevState => !prevState);
        setRows(newRows);
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

    const onTableHeaderChange = (index: number) => {
        setTableHeader(HEADERS[index + 1]);
        onCalculate(HEADERS[index + 1]);
    }

    const onLabelChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDataLabel(e.nativeEvent.text);
    }

    const onSaveData = async () => {
        const currentData = await AsyncStorage.getItem('incomeData');
        const listData = currentData === null ? [] : JSON.parse(currentData);
        const data = {
            id: listData === null ? 1 : listData.length + 1,
            date: new Date().toLocaleDateString(),
            label: dataLabel,
            currency: selectedCurrency,
            amount: primaryIncomeHolder.current === "" ? 0 : parseFloat(primaryIncomeHolder.current),
            frequency: incomePeriod,
            ...hasKiwiSaver && {
                kiwiSave: yearKiwiSaver,
            },
            ...hasStudentLoan && {
                studentLoanRate,
                studentLoanThreshold
            },
            ...hasSecondaryIncome && {
                secondaryIncome
            }
        };

        listData.push(data);
        await AsyncStorage.setItem('incomeData', JSON.stringify(listData));
        setDataLabel("");
        setShowSaveModal(false);
    }

    const styles = StyleSheet.create({
        incomeView: {
            display: "flex",
            flexDirection: 'row',
            position: "relative",
            justifyContent: "space-between"
        },
        input: {
            width: 100,
            backgroundColor: appState.isDarkMode ? '#443472' : "white"
        },
    });

    return (
        <ScrollView style={{ display: isHidden ? "none" : "flex" }}>
            <View style={styles.incomeView}>
                <Dropdown
                    onSelect={(index: number) => setSelecctedCurrency(CURRENCIES[index])}
                    value={selectedCurrency}
                    list={CURRENCIES}
                    listStyle={{
                        width: 110,
                        left: 20,
                        top: 112,
                    }}
                    containerStyle={{
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
                    list={incomePeriods.map(p => (p.label))}
                    listStyle={{
                        width: 150,
                        left: 245,
                        top: 112,
                    }}
                    containerStyle={{
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
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 35, marginBottom: 35 }}>
                <Button
                    title='Calculate'
                    onPress={() => onCalculate(tableHeader)}
                    disabled={primaryIncome === 0}
                    color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 35 }}>
                <CheckBox
                    checked={isSimpleTable}
                    onChange={updateTableRows}
                >
                    Simple table
                </CheckBox>
                <Dropdown
                    onSelect={onTableHeaderChange}
                    value={tableHeader.label}
                    list={HEADERS.filter(h => !!h.label).map(h => h.label)}
                    listStyle={{
                        width: 150,
                        left: 278,
                        top: 267,
                    }}
                    containerStyle={{
                        width: 150
                    }}
                />
            </View>
            <View style={{ position: "relative" }}>
                <IncomeTable rows={rows} />
                {hasCalculated && (
                    <View style={{ position: "absolute", top: "45%", right: 0 }}>
                        <Button title='Save' onPress={() => setShowSaveModal(true)} color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"} />
                    </View>
                )}
                <IncomePieChart pieData={pieData} yearGrossPay={yearGrossPay} />
            </View>
            {showSaveModal && (
                <CustomModal
                    isVisible={true}
                    onClose={() => setShowSaveModal(false)}
                >
                    <CustomInput
                        label={"Label (Optional)"}
                        onChange={onLabelChange}
                        value={dataLabel}
                    />
                    <View style={{ width: 150, marginTop: 15 }}>
                        <Button
                            title="Save"
                            onPress={onSaveData}
                            color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                        />
                    </View>
                </CustomModal>
            )}
        </ScrollView>
    )
};

export default memo(IncomePage);
