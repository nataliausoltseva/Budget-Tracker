import { Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import CustomText from '../../../components/CustomText';
import CustomInput from '../../../components/CustomInput';

type Props = {
    rate: number,
    threshold: number,
    setRate: (rate: number) => void,
    setThreshold: (threshold: number) => void,
    isEditable: boolean,
}

const StudentLoanForm = ({ rate, threshold, setRate, setThreshold, isEditable = true, }: Props) => {
    const onRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setRate(parseFloat(e.nativeEvent.text));
    }

    const onThresholdChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setThreshold(parseFloat(e.nativeEvent.text));
    }

    return (
        <SafeAreaView style={{ flexDirection: "row" }}>
            <View style={styles.view}>
                <CustomText style={{ opacity: isEditable ? 1 : 0.3 }}>Rate:</CustomText>
                <CustomInput
                    style={styles.input}
                    value={rate.toString()}
                    onChange={onRateChange}
                    isEditable={isEditable}
                    isNumeric
                />
            </View>
            <View style={[styles.view, { marginLeft: 10 }]}>
                <CustomText style={{ opacity: isEditable ? 1 : 0.3 }}>Threshold:</CustomText>
                <CustomInput
                    style={styles.input}
                    value={threshold.toString()}
                    onChange={onThresholdChange}
                    isEditable={isEditable}
                    isNumeric
                />
            </View>
        </SafeAreaView>
    )
};

export default StudentLoanForm;

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        marginLeft: 10,
        width: 70
    }
});