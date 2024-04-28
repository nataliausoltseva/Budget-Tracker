import { Input } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';

type Props = {
    income: number,
    setIncome: (income: number) => void,
}

const SecondaryIncomeForm = ({ income, setIncome }: Props) => {
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
                <Text>Total annual income from other sources</Text>
                <Input
                    style={styles.input}
                    placeholder={"Secondaty income"}
                    value={secondaryIncomeHolder.current}
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