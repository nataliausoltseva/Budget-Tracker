import React, { useRef, useState } from 'react';
import { Button, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native';
import { ExpenseItem, FREQUENCES } from '../BudgetPage';
import CustomModal from '../../../components/CustomModal';
import Dropdown from '../../../components/Dropdown';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';

type Props = {
    onSave: (item: ExpenseItem) => void,
    onClose: () => void,
    expense?: ExpenseItem | null,
}

const DEFAULT_STATE = {
    name: "",
    frequenceIndex: 0,
    amount: "0"
}

const BudgetItem = ({ onSave, onClose, expense = null }: Props) => {
    const [item, setItem] = useState(DEFAULT_STATE);
    const amountInputHolder = useRef("0");

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

    const onFrequencySelect = (frequenceIndex: number) => {
        setItem({
            ...item,
            frequenceIndex,
        });
    }

    const _onSave = () => {
        onSave({
            ...item,
            value: isNaN(parseFloat(item.amount)) ? 0 : parseFloat(item.amount),
            frequencyIndex: item.frequenceIndex
        });
        _onClose();
    }

    return (
        <CustomModal isVisible={true} onClose={_onClose} style={{ width: 300 }} >
            <CustomText style={{ textAlign: "center" }}>New expense</CustomText>
            <CustomInput
                placeholder='Enter expense name'
                value={item.name}
                onChange={onNameChange}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 10 }}>
                <CustomInput
                    value={amountInputHolder.current}
                    onChange={_onAmountChange}
                    isNumeric
                />
                <Dropdown
                    onSelect={onFrequencySelect}
                    value={FREQUENCES[item.frequenceIndex].name}
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
                    />
                </View>
            </View>
        </CustomModal>
    );
}

export default BudgetItem;
