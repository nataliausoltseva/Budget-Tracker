import React, { memo, useContext, useState } from 'react';
import { Button, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BudgetItemModal from './components/BudgetItemModal';
import PieChartWithSelection from './components/PieChartWithSelection';
import { AppContext } from '../../context/AppContext';
import { randomHex } from '../../hooks/color';
import CustomText from '../../components/CustomText';
import BudgetItem from './components/BudgetItem';
import CustomModal from '../../components/CustomModal';
import CustomInput from '../../components/CustomInput';
import HistoryModal from './components/HistoryModal';

type Props = {
    isHidden: boolean,
    showHistoryModal: boolean,
    storageData: BudgetHistoryItem[],
    onCloseHistoryModal: () => void,
    onSaveHistory: () => void,
    onDeleteStorageItem: (id: number) => void,
}

const BudgetPage = ({ isHidden = false, showHistoryModal = false, storageData = [], onCloseHistoryModal, onSaveHistory, onDeleteStorageItem }: Props) => {
    const appState = useContext(AppContext);
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

    const [, setRandom] = useState(Math.random());
    const [showMoal, setShowModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [dataLabel, setDataLabel] = useState(new Date().toLocaleDateString());
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<BudgetHistoryItem>();

    const onChangeExpense = (index: number, item: ExpenseItem) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses: ExpenseItem[] = [...prevState];
            newExpenses[index] = item;
            return newExpenses;
        });
    }

    const onSave = (item: ExpenseItem) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses = [...prevState];
            const value = Math.round(item.value * 100) / 100;
            newExpenses.push({
                ...item,
                value,
                id: newExpenses.length,
                color: randomHex()
            });
            return newExpenses;
        });
        setRandom(Math.random());
    }

    const onItemDelete = (index: number) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses: ExpenseItem[] = [...prevState];
            newExpenses.splice(index, 1);
            return newExpenses;
        });
    }

    const onAddToSavings = (leftOver: number, frequency: FrequencyItem) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const value = Math.round(leftOver * 100) / 100;
            const newExpenses: ExpenseItem[] = [...prevState];
            let savingItem = newExpenses.find((item: ExpenseItem) => !!item.key);

            if (!savingItem) {
                newExpenses.push({
                    key: 'savings',
                    value,
                    name: "Savings",
                    frequency: frequency,
                    id: newExpenses.length,
                    color: randomHex()
                });
            } else {
                const itemIndex = newExpenses.indexOf(savingItem);
                savingItem.value += value;
                newExpenses[itemIndex] = savingItem
            }

            return newExpenses;
        });
        setRandom(Math.random());
    }

    const renderButton = () => {
        return (
            <View style={{ width: 50 }}>
                <Button
                    title={"Add"}
                    onPress={() => setShowModal(true)}
                    color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                />
            </View>
        )
    }

    const onCloseModal = () => {
        setShowModal(false);
    }

    const onLabelChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDataLabel(e.nativeEvent.text);
    }

    const onSaveData = async () => {
        const currentData = await AsyncStorage.getItem('budgetData');
        const listData = currentData === null ? [] : JSON.parse(currentData);
        const data: BudgetHistoryItem = {
            id: listData === null ? 1 : listData.length + 1,
            date: new Date().toLocaleDateString(),
            label: dataLabel,
            expenses: expenses,
        };

        if (selectedHistoryItem) {
            data.id = selectedHistoryItem.id
            const itemIndex = listData.findIndex((item: BudgetHistoryItem) => item.id === selectedHistoryItem.id);
            listData[itemIndex] = data;
        } else {
            setSelectedHistoryItem(data);
            listData.push(data);
        }

        await AsyncStorage.setItem('budgetData', JSON.stringify(listData));
        setDataLabel("");
        setShowSaveModal(false);
        onSaveHistory();
    }

    const onUse = (item: BudgetHistoryItem) => {
        setExpenses(item.expenses);
        setSelectedHistoryItem(item);
        setDataLabel(item.label || item.date);
        onCloseHistoryModal();
    }

    return (
        <View style={{ display: isHidden ? "none" : "flex", flexGrow: 1 }}>
            {showMoal && (
                <BudgetItemModal
                    onSave={onSave}
                    onClose={onCloseModal}
                />
            )}
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
            {expenses.length ? (
                <>
                    <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                        <View style={{ position: "relative", width: 100 }}>
                            <Button title='Save' onPress={() => setShowSaveModal(true)} color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"} />
                        </View>
                    </View>
                    <ScrollView>
                        <PieChartWithSelection expenses={expenses} onAddToSavings={onAddToSavings} />
                        <View style={styles.spacer} />
                        {expenses.map((item: ExpenseItem, index: number) => (
                            <BudgetItem
                                key={index}
                                item={item}
                                onDelete={() => onItemDelete(index)}
                                onSave={(item: ExpenseItem) => onChangeExpense(index, item)}
                            />
                        ))}
                        <View style={{ alignItems: "flex-end", marginTop: 20 }}>
                            {renderButton()}
                        </View>
                    </ScrollView>
                </>
            ) : (
                <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                    <CustomText style={{ marginBottom: 20 }}>Add you first expense</CustomText>
                    {renderButton()}
                </View>
            )}
            {showHistoryModal && (
                <HistoryModal
                    data={storageData}
                    onClose={onCloseHistoryModal}
                    onDelete={onDeleteStorageItem}
                    onUse={onUse}
                />
            )}
        </View>
    );
}

export default memo(BudgetPage);

const styles = StyleSheet.create({
    spacer: {
        marginBottom: 20
    },
});