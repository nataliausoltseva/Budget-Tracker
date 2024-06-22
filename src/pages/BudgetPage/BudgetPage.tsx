import { Text } from '@ui-kitten/components';
import React, { memo, useContext, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import BudgetItemModal from './components/BudgetItemModal';
import PieChartWithSelection from './components/PieChartWithSelection';
import { AppContext } from '../../context/AppContext';
import { randomHex } from '../../hooks/color';

type Props = {
    isHidden: boolean
}

export type ExpenseItem = {
    key?: string,
    name: string,
    value: number,
    frequencyIndex: number,
    id?: number,
    color?: string,
}

export const FREQUENCES: FrequencyItem[] = [
    {
        name: "One-off",
        key: "oneOff",
        calcToYear: 1
    },
    {
        name: "Week",
        key: "week",
        calcToYear: 52
    },
    {
        name: "Fortnight",
        key: "fortnight",
        calcToYear: 26
    },
    {
        name: "Month",
        key: "month",
        calcToYear: 13
    },
    {
        name: "Year",
        key: "year",
        calcToYear: 1
    },
];



const BudgetPage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

    const [random, setRandom] = useState(Math.random());
    const [showMoal, setShowModal] = useState(false);

    const onChangeExpense = (id: number, key: string, value: number) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses: ExpenseItem[] = [...prevState];
            const expenseKey: keyof ExpenseItem = key as keyof ExpenseItem;
            const currentItem = newExpenses.find((item: ExpenseItem) => item.id === id);
            if (currentItem) {
                switch (expenseKey) {
                    case "name":
                        currentItem.name = typeof value === 'string' ? value : '';
                        break;
                    case "value":
                        currentItem.value = typeof value === 'string' ? isNaN(parseFloat(value)) ? 0 : parseFloat(value) : 0;
                        break;
                    case "frequencyIndex":
                        currentItem.frequencyIndex = value;
                        break;
                }
                const currentItemIndex = newExpenses.indexOf(currentItem);
                newExpenses[currentItemIndex] = currentItem;
            }

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

    const onItemDelete = (item: ExpenseItem) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses: ExpenseItem[] = [...prevState];
            const itemIndex = newExpenses.indexOf(item);
            newExpenses.splice(itemIndex, 1);
            return newExpenses;
        });
    }

    const onAddToSavings = (leftOver: number, frequencyIndex: number) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const value = Math.round(leftOver * 100) / 100;
            const newExpenses: ExpenseItem[] = [...prevState];
            let savingItem = newExpenses.find((item: ExpenseItem) => !!item.key);

            if (!savingItem) {
                newExpenses.push({
                    key: 'savings',
                    value,
                    name: "Savings",
                    frequencyIndex,
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
        <View style={{ display: isHidden ? "none" : "flex" }}>
            {showMoal && (
                <BudgetItemModal
                    onSave={onSave}
                    onClose={onCloseModal}
                />
            )}
            {expenses.length ? (
                <ScrollView >
                    <View style={styles.spacer} />
                    {/* {expenses.map((item: ExpenseItem, index: number) => (
                        <BudgetItemModal
                            key={`e-${index}-${random}`}
                        // name={item.name}
                        // amount={item.value.toString()}
                        // fruquencyIndex={item.frequencyIndex}
                        // onNameChange={(e) => onChangeExpense(item.id, "name", e.nativeEvent.text)}
                        // onAmountChange={(amount: string) => onChangeExpense(item.id, "value", amount)}
                        // onFrequenceChange={(selectedIndex) => onChangeExpense(item.id, "frequencyIndex", selectedIndex)}
                        // onDelete={() => onItemDelete(item)}
                        // hasDeleteButton
                        />
                    ))} */}
                    {/* {!!expenses.length && (
                        <PieChartWithSelection expenses={expenses} onAddToSavings={onAddToSavings} />
                    )} */}
                </ScrollView>
            ) : (
                <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                    <Text style={{ marginBottom: 20 }}>Add you first expense</Text>
                    {renderButton()}
                </View>
            )}
        </View>
    );
}

export default memo(BudgetPage);

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
    spacer: {
        marginBottom: 20
    }
});