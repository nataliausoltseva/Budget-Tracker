import React, { useEffect, useRef, useState } from 'react';
import { Button, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import Dropdown from '../../../components/Dropdown';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import { FREQUENCES } from '../../../constants';

type Props = {
    onSave: (item: ExpenseItem) => void,
    onClose: () => void,
    expense?: ExpenseItem | null,
}

const DEFAULT_STATE = {
    name: "",
    frequency: FREQUENCES[0],
    amount: "0"
}

const BudgetItemModal = ({ onSave, onClose, expense = null }: Props) => {
    const [item, setItem] = useState(DEFAULT_STATE);
    const amountInputHolder = useRef("0");

    useEffect(() => {
        if (expense) {
            const newItem = {
                name: expense.name,
                frequency: expense.frequency,
                amount: expense.value.toString()
            };
            setItem(newItem);
            amountInputHolder.current = expense.value.toString()
        }
    }, [expense]);

    const _onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        amountInputHolder.current = e.nativeEvent.text || "";
        if (amountInputHolder.current) {
            onAmountChange(amountInputHolder.current);
        } else if (!amountInputHolder.current) {
            onAmountChange("");
        }
    }

    const _onClose = () => {
        setItem(DEFAULT_STATE);
        onClose();
    }

    const onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            name: e.nativeEvent.text || ""
        });
    }

    const onAmountChange = (amount: string) => {
        setItem({
            ...item,
            amount,
        });
    }

    const onFrequencySelect = (index: number) => {
        setItem({
            ...item,
            frequency: FREQUENCES[index],
        });
    }

    const _onSave = () => {
        onSave({
            name: item.name,
            value: isNaN(parseFloat(item.amount)) ? 0 : parseFloat(item.amount),
            frequency: item.frequency,
        });
        _onClose();
    }

    return (
        <CustomModal isVisible={true} onClose={_onClose} style={{ width: 300 }} >
            <CustomText style={{ textAlign: "center" }}>{expense !== null ? "Your" : "New"} expense</CustomText>
            <CustomInput
                placeholder='Expense name'
                value={item.name}
                onChange={onNameChange}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 10 }}>
                <CustomInput
                    value={amountInputHolder.current}
                    onChange={_onAmountChange}
                    style={{ width: 80, marginRight: 10 }}
                    isNumeric
                />
                <Dropdown
                    onSelect={onFrequencySelect}
                    value={item.frequency.name}
                    list={FREQUENCES.map(value => value.name)}
                    listStyle={{
                        width: 150,
                        left: 200,
                        top: 501,
                    }}
                    containerStyle={{
                        width: 150
                    }}
                />
            </View>
            <View style={{ alignItems: "center" }}>
                <View style={{ width: 100 }}>
                    <Button
                        title='Save'
                        onPress={_onSave}
                        disabled={item.amount === "0" || item.amount === ""}
                    />
                </View>
            </View>
        </CustomModal>
    );
}

export default BudgetItemModal;
