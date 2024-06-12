import { Input } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import CustomInput from '../../../components/CustomInput';

type Props = {
    income: number,
    setIncome: (income: number) => void,
    isEditable: boolean,
}

const SecondaryIncomeForm = ({ income, setIncome, isEditable = true }: Props) => {
    const secondaryIncomeHolder = useRef("");

    const onIncomeChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        secondaryIncomeHolder.current = e.nativeEvent.text || "";

        if (secondaryIncomeHolder.current) {
            setIncome(parseFloat(secondaryIncomeHolder.current));
        } else if (!e.nativeEvent.text) {
            setIncome(0);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.view}>
                <CustomInput
                    placeholder={"Secondaty income"}
                    value={secondaryIncomeHolder.current}
                    onChange={onIncomeChange}
                    isEditable={isEditable}
                    isNumeric
                />
            </View>
        </SafeAreaView>
    )
}

export default SecondaryIncomeForm;

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
    },
});