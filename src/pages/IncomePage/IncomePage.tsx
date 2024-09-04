import React, { memo, useContext, useRef, useState } from 'react';
import { Animated, Button, Easing, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
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
import HistoryModal from './components/HistoryModal';
import CheckBox from '../../components/Checkbox';

type Props = {
    isHidden: boolean,
    showHistoryModal: boolean,
    storageData: IncomeHistoryItem[],
    onCloseModal: () => void,
    onSaveHistory: () => void,
    onDeleteStorageItem: (id: number) => void,
}

const IncomePage = ({ isHidden = false, showHistoryModal = false, storageData = [], onCloseModal, onSaveHistory, onDeleteStorageItem }: Props) => {
    const appState = useContext(AppContext);
    const [selectedCurrency, setSelecctedCurrency] = useState<string>(CURRENCIES[0]);
    const [showFilter, setShowFilter] = useState(false);
    const [tableHeader, setTableHeader] = useState<IncomeTableHeader>(HEADERS[1]);
    const [hasCalculated, setHasCalculated] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [dataLabel, setDataLabel] = useState(new Date().toLocaleDateString());
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<IncomeHistoryItem>();

    // The list (table) only updates if we pass something new to the extraData prop.
    const [, setRandom] = useState(Math.random());

    const primaryIncomeHolder = useRef("");

    const {
        primaryIncome,
        incomePeriod,
        hasSuperannuation,
        hasSecondaryIncome,
        hasStudentLoan,
        superannuationOption,
        studentLoanRate,
        studentLoanThreshold,
        secondaryIncome,
        taxThresholds,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onSuperannuationChange,
        onStudentLoanChange,
        setHasSecondaryIncome,
        setHasStudentLoan,
        setHasSuperannuation,
        setSecondaryIncome,
        calculateYearlyValues,
        onTaxThresholdsChange,
        onCloseFilterModal,
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

    const onIncomeAmountChange = (amount: string) => {
        primaryIncomeHolder.current = amount || "";

        if (primaryIncomeHolder.current) {
            onPrimaryIncomeChange(parseFloat(primaryIncomeHolder.current));
        } else if (!amount) {
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
        yearSuperannuation,
        yearStudentLoan,
        yearSecGrossPay,
        yearSecPaye,
    } = calculateYearlyValues();

    const onCalculate = (tableHeader: IncomeTableHeader) => {
        setHasCalculated(true);
        appState?.setTotalIncome(yearGrossPay + yearSecGrossPay - yearPaye - yearAcc - (hasSuperannuation ? yearSuperannuation : 0) - (hasStudentLoan ? yearStudentLoan : 0) - yearSecPaye);
        populateTableRows({
            yearGrossPay,
            yearPaye,
            yearAcc,
            yearSuperannuation: hasSuperannuation ? yearSuperannuation : 0,
            yearStudentLoan: hasStudentLoan ? yearStudentLoan : 0,
            yearSecGrossPay: hasSecondaryIncome ? yearSecGrossPay : 0,
            yearSecPaye: hasSecondaryIncome ? yearSecPaye : 0,
            tableHeader,
        })
        setRandom(Math.random());
        populateData({
            yearPaye,
            yearAcc,
            yearSuperannuation: hasSuperannuation ? yearSuperannuation : 0,
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
        setShowFilter(true);
    }

    const onCloseFilter = () => {
        if (!hasSuperannuation && !hasSecondaryIncome && !hasStudentLoan) {
            Animated.timing(rotateValue, {
                toValue: 0,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
        setShowFilter(false);
        onCloseFilterModal();
    }

    const onTableHeaderChange = (index: number) => {
        setTableHeader(HEADERS[index + 1]);
        onCalculate(HEADERS[index + 1]);
    }

    const onLabelChange = (label: string) => {
        setDataLabel(label);
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
            ...hasSuperannuation && {
                superannuation: superannuationOption,
            },
            ...hasStudentLoan && {
                studentLoanRate,
                studentLoanThreshold
            },
            ...hasSecondaryIncome && {
                secondaryIncome
            }
        };

        if (selectedHistoryItem) {
            data.id = selectedHistoryItem.id
            const itemIndex = listData.findIndex((item: IncomeHistoryItem) => item.id === selectedHistoryItem.id);
            listData[itemIndex] = data;
        } else {
            setSelectedHistoryItem(data);
            listData.push(data);
        }
        await AsyncStorage.setItem('incomeData', JSON.stringify(listData));
        if (!selectedHistoryItem) {
            setDataLabel("");
        }
        setShowSaveModal(false);
        onSaveHistory();
    }

    const onHistoryUse = (item: IncomeHistoryItem) => {
        setSelectedHistoryItem(item);
        onPrimaryIncomeChange(item.amount);
        setSelecctedCurrency(item.currency);
        onIncomePeriodChange(item.frequency);
        setDataLabel(item.label);
        primaryIncomeHolder.current = item.amount.toString();
        setHasSecondaryIncome(!!item?.secondaryIncome);
        setSecondaryIncome(item?.secondaryIncome || 0);
        setHasSuperannuation(!!item?.superannuation);
        onSuperannuationChange(item?.superannuation || 0);
        setHasStudentLoan(!!item.studentLoanRate || !!item.studentLoanThreshold);
        onStudentLoanChange(item?.studentLoanRate || 0, item?.studentLoanThreshold || 0);
        onCloseFilter();
        onCalculate(tableHeader);
        onCloseModal();
    }

    const styles = StyleSheet.create({
        incomeView: {
            flexDirection: 'row',
            justifyContent: "space-between",
        },
        input: {
            width: 100,
            backgroundColor: appState.isDarkMode ? '#443472' : "white"
        },
        container: {
            display: isHidden ? "none" : "flex"
        },
        incomeInput: {
            justifyContent: "flex-end"
        },
        actions: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 35,
            marginBottom: 35
        },
        historySaveButton: {
            position: "absolute",
            right: 0
        },
        simpleDataContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 35
        },
        saveModalButton: {
            width: 150,
            marginTop: 15
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.incomeView}>
                <Dropdown
                    onSelect={(index: number) => setSelecctedCurrency(CURRENCIES[index])}
                    value={selectedCurrency}
                    list={CURRENCIES}
                    width={110}
                />
                <View style={styles.incomeInput}>
                    <CustomInput
                        value={primaryIncomeHolder.current}
                        onChange={onIncomeAmountChange}
                        style={styles.input}
                        isNumeric
                    />
                </View>
                <Dropdown
                    onSelect={onPreiodSelect}
                    value={incomePeriod.label}
                    list={incomePeriods.map(p => (p.label))}
                    width={150}
                />
                <View>
                    <Animated.View style={{ transform: [{ rotate: positionInterPol }] }}>
                        <FilterIcon
                            onPress={onShowFilter}
                            color={getMainColour(appState.isDarkMode, hasSuperannuation || hasSecondaryIncome || hasSecondaryIncome)}
                        />
                    </Animated.View>
                    {showFilter && (
                        <FilterModal
                            onClose={onCloseFilter}
                            hasSuperannuation={hasSuperannuation}
                            setHasSuperannuation={setHasSuperannuation}
                            superannuationOption={superannuationOption}
                            onSuperannuationChange={onSuperannuationChange}
                            hasStudentLoan={hasStudentLoan}
                            setHasStudentLoan={setHasStudentLoan}
                            studentLoanRate={studentLoanRate}
                            studentLoanThreshold={studentLoanThreshold}
                            onStudentLoanChange={onStudentLoanChange}
                            hasSecondaryIncome={hasSecondaryIncome}
                            setHasSecondaryIncome={setHasSecondaryIncome}
                            secondaryIncome={secondaryIncome}
                            setSecondaryIncome={setSecondaryIncome}
                            taxThresholds={taxThresholds}
                            onTaxThresholdsChange={onTaxThresholdsChange}
                        />
                    )}
                </View>
            </View>
            <View style={styles.actions}>
                <Button
                    title='Calculate'
                    onPress={() => onCalculate(tableHeader)}
                    disabled={primaryIncome === 0}
                    color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                />
                {hasCalculated && (
                    <View style={styles.historySaveButton}>
                        <Button title='Save' onPress={() => setShowSaveModal(true)} color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"} />
                    </View>
                )}
            </View>
            <View style={styles.simpleDataContainer}>
                <CheckBox
                    isChecked={isSimpleTable}
                    onPress={updateTableRows}
                    label='Simple table'
                />
                <Dropdown
                    onSelect={onTableHeaderChange}
                    value={tableHeader.label}
                    list={HEADERS.filter(h => !!h.label).map(h => h.label)}
                    width={150}
                />
            </View>
            <View>
                <IncomeTable rows={rows} />
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
                    <View style={styles.saveModalButton}>
                        <Button
                            title="Save"
                            onPress={onSaveData}
                            color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                        />
                    </View>
                </CustomModal>
            )}
            {showHistoryModal && (
                <HistoryModal
                    data={storageData}
                    onClose={onCloseModal}
                    onDelete={onDeleteStorageItem}
                    onUse={onHistoryUse}
                />
            )}
        </View>
    )
};

export default memo(IncomePage);
