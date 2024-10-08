import React, { useRef } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import CustomInput from '../../../components/CustomInput';

type Props = {
    income: number,
    setIncome: (income: number) => void,
    isEditable: boolean,
}

const SecondaryIncomeForm = ({ income, setIncome, isEditable = true }: Props) => {
    const secondaryIncomeHolder = useRef("");

    const onIncomeChange = (value: string) => {
        secondaryIncomeHolder.current = value || "";

        if (secondaryIncomeHolder.current) {
            setIncome(parseFloat(secondaryIncomeHolder.current));
        } else if (!value) {
            setIncome(0);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.view}>
                <CustomInput
                    value={secondaryIncomeHolder.current}
                    onChange={onIncomeChange}
                    isEditable={isEditable}
                    style={styles.input}
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
    input: {
        width: 80,
        marginLeft: 10
    }
});