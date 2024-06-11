import { Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import CustomText from '../../../components/CustomText';

type Props = {
    rate: number,
    threshold: number,
    setRate: (rate: number) => void,
    setThreshold: (threshold: number) => void,
}

const StudentLoanForm = ({ rate, threshold, setRate, setThreshold }: Props) => {
    const onRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setRate(parseFloat(e.nativeEvent.text));
    }

    const onThresholdChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setThreshold(parseFloat(e.nativeEvent.text));
    }

    return (
        <SafeAreaView style={{ flexDirection: "row" }}>
            <View style={styles.view}>
                <CustomText>Rate:</CustomText>
                <Input
                    style={styles.input}
                    placeholder={"Student loan rate"}
                    value={rate.toString()}
                    onChange={onRateChange}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
            </View>
            <View style={[styles.view, { marginLeft: 10 }]}>
                <CustomText>Threshold:</CustomText>
                <Input
                    style={styles.input}
                    placeholder={"Student loan threshold"}
                    value={threshold.toString()}
                    onChange={onThresholdChange}
                    {...{
                        keyboardType: "numeric"
                    }}
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
        maxWidth: 100
    }
});