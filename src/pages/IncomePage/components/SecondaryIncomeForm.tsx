import { Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';

type Props = {
    income: number,
    setIncome: (income: number) => void,
}

const SecondaryIncomeForm = ({ income, setIncome }: Props) => {
    const onIncomeChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setIncome(parseFloat(e.nativeEvent.text));
    }
    return (
        <SafeAreaView>
            <View style={styles.view}>
                <Text>Total annual income from other sources</Text>
                <Input
                    style={styles.input}
                    placeholder={"Secondaty income"}
                    value={income.toString()}
                    onChange={onIncomeChange}
                    {...{
                        keyboardType: "numeric"
                    }}
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
    input: {
        flexGrow: 1,
        marginLeft: 10
    }
});