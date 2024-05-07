import { Button, IndexPath, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import BudgetItem from './components/BudgetItem';
import PieChartWithSelection from './components/PieChartWithSelection';

type Props = {
    isHidden: boolean,
    totalIncome: number
}

export type ExpenseItem = {
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

const BudgetPage = ({ isHidden = false, totalIncome = 0 }: Props) => {
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
    const [name, setName] = useState(DEFAULT_STATE.name);
    const [amount, setAmount] = useState(DEFAULT_STATE.amount);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(DEFAULT_STATE.frequenceIndex));

    const randomNum = () => Math.floor(Math.random() * 255);
    const componentToHex = () => {
        var hex = randomNum().toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    const randomHex = () => "#" + componentToHex() + componentToHex() + componentToHex() + "99"

    const onChangeExpenseName = (id: number, key: string, value: string | IndexPath | IndexPath[]) => {
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
                        currentItem.value = typeof value === 'number' ? value : 0;
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

    const onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setAmount(e.nativeEvent.text || "");
    }

    const onSave = () => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses = [...prevState];
            newExpenses.push({
                name,
                value: parseFloat(amount) || 0,
                frequencyIndex: selectedIndex,
                id: newExpenses.length ? newExpenses.length - 1 : 0,
                color: randomHex()
            });
            return newExpenses;
        });
        setName(DEFAULT_STATE.name);
        setAmount(DEFAULT_STATE.amount);
        setSelectedIndex(new IndexPath(DEFAULT_STATE.frequenceIndex));
    }

    const onItemDelete = (item: ExpenseItem) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses: ExpenseItem[] = [...prevState];
            const itemIndex = newExpenses.indexOf(item);
            newExpenses.splice(itemIndex, 1);
            return newExpenses;
        });
    }

    return (
        <View style={{ display: isHidden ? "none" : "flex" }}>
            <BudgetItem
                key={"new-item"}
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
                    key={`e-${index}`}
                    name={item.name}
                    amount={item.value.toString()}
                    fruquencyIndex={item.frequencyIndex}
                    onNameChange={(e) => onChangeExpenseName(item.id, "name", e.nativeEvent.text)}
                    onAmountChange={(e) => onChangeExpenseName(item.id, "value", e.nativeEvent.text)}
                    onFrequenceChange={(selectedIndex) => onChangeExpenseName(item.id, "frequencyIndex", selectedIndex)}
                    onDelete={() => onItemDelete(item)}
                    hasDeleteButton
                />
            ))}
            {!!expenses.length && (
                <PieChartWithSelection expenses={expenses} totalIncome={totalIncome} />
            )}
        </View>
    );
}

export default BudgetPage;

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