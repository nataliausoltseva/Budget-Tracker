import { Button, IndexPath, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import BudgetItem from './components/BudgetItem';

type Props = {
    isHidden: boolean
}

type ExpenseItem = {
    name: string,
    value: string,
    frequencyIndex: IndexPath | IndexPath[],
    index: number
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
        calcToYear: 12
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

    const onChangeExpenseName = (index: number, key: string, value: string | IndexPath | IndexPath[]) => {
        setExpenses((prevState: ExpenseItem[]) => {
            const newExpenses = [...prevState];
            // newExpenses[index].name = newValue;
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
                value: amount || "0",
                frequencyIndex: selectedIndex,
                index: newExpenses.length - 1
            });
            return newExpenses;
        });
    }

    return (
        <View style={{ display: isHidden ? "none" : "flex" }}>
            {/* {expenses.map((item: ExpenseItem) => (
                <BudgetItem
                    key={item.index}
                    name={item.name}
                    amount={item.value}
                    fruquencyIndex={item.frequencyIndex}
                    onNameChange={on}
                />
            ))} */}
            <BudgetItem
                name={name}
                amount={amount}
                fruquencyIndex={selectedIndex}
                onNameChange={onNameChange}
                onAmountChange={onAmountChange}
                onFrequenceChange={setSelectedIndex}
            />
            <Button onPress={onSave}>Add</Button>
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
});