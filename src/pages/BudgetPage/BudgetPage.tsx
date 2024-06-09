import { Button, IndexPath, Text } from '@ui-kitten/components';
import React, { memo, useContext, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import BudgetItem from './components/BudgetItem';
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
    frequencyIndex: IndexPath | IndexPath[],
    id: number,
    color: string,
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

const DEFAULT_STATE = {
    name: "",
    frequenceIndex: 0,
    amount: "0"
}

const BudgetPage = ({ isHidden = false }: Props) => {
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
    const [name, setName] = useState(DEFAULT_STATE.name);
    const [amount, setAmount] = useState(DEFAULT_STATE.amount);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(DEFAULT_STATE.frequenceIndex));
    const [random, setRandom] = useState(Math.random());

    const onChangeExpense = (id: number, key: string, value: string | IndexPath | IndexPath[]) => {
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
                        if (value instanceof IndexPath) {
                            currentItem.frequencyIndex = value;
                        }
                        break;
                }
                const currentItemIndex = newExpenses.indexOf(currentItem);
                newExpenses[currentItemIndex] = currentItem;
            }

            return newExpenses;
        });
    }

    const onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setName(e.nativeEvent.text || "");
    }

    const onAmountChange = (amount: string) => {
        setAmount(amount);
    }

    const onSave = () => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses = [...prevState];
            const value = Math.round(amount * 100) / 100;
            newExpenses.push({
                name,
                value,
                frequencyIndex: selectedIndex,
                id: newExpenses.length,
                color: randomHex()
            });
            return newExpenses;
        });
        setName(DEFAULT_STATE.name);
        setAmount(DEFAULT_STATE.amount);
        setSelectedIndex(new IndexPath(DEFAULT_STATE.frequenceIndex));
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

    const onAddToSavings = (leftOver: number, frequencyIndex: IndexPath | IndexPath[]) => {
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

    return (
        <ScrollView style={{ display: isHidden ? "none" : "flex" }}>
            <BudgetItem
                key={`new-item-${random}`}
                name={name}
                amount={amount}
                fruquencyIndex={selectedIndex}
                onNameChange={onNameChange}
                onAmountChange={onAmountChange}
                onFrequenceChange={setSelectedIndex}
            />
            <Button onPress={onSave} disabled={!name || !amount || amount === "0" || isNaN(parseFloat(amount))}>Add</Button>
            <View style={styles.spacer} />
            {!!expenses.length && (
                <Text>Your expenses:</Text>
            )}
            {expenses.map((item: ExpenseItem, index: number) => (
                <BudgetItem
                    key={`e-${index}-${random}`}
                    name={item.name}
                    amount={item.value.toString()}
                    fruquencyIndex={item.frequencyIndex}
                    onNameChange={(e) => onChangeExpense(item.id, "name", e.nativeEvent.text)}
                    onAmountChange={(amount: string) => onChangeExpense(item.id, "value", amount)}
                    onFrequenceChange={(selectedIndex) => onChangeExpense(item.id, "frequencyIndex", selectedIndex)}
                    onDelete={() => onItemDelete(item)}
                    hasDeleteButton
                />
            ))}
            {!!expenses.length && (
                <PieChartWithSelection expenses={expenses} onAddToSavings={onAddToSavings} />
            )}
        </ScrollView>
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