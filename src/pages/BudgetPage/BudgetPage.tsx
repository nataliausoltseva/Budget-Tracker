import React, { memo, useContext, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import BudgetItemModal from './components/BudgetItemModal';
import PieChartWithSelection from './components/PieChartWithSelection';
import { AppContext } from '../../context/AppContext';
import { randomHex } from '../../hooks/color';
import { FREQUENCES } from '../../constants';
import CustomText from '../../components/CustomText';
import BudgetItem from './components/BudgetItem';

type Props = {
    isHidden: boolean
}

export type ExpenseItem = {
    key?: string,
    name: string,
    value: number,
    frequency: FrequencyItem,
    id?: number,
    color?: string,
}

const BudgetPage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

    const [random, setRandom] = useState(Math.random());
    const [showMoal, setShowModal] = useState(false);

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

    return (
        <View style={{ display: isHidden ? "none" : "flex", flexGrow: 1 }}>
            {showMoal && (
                <BudgetItemModal
                    onSave={onSave}
                    onClose={onCloseModal}
                />
            )}
            {expenses.length ? (
                <ScrollView >
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
            ) : (
                <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                    <CustomText style={{ marginBottom: 20 }}>Add you first expense</CustomText>
                    {renderButton()}
                </View>
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