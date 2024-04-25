import { Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';

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
        <SafeAreaView>
            <View style={styles.view}>
                <Text>Student loan rate</Text>
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
            <View style={styles.view}>
                <Text>Student oan threshold</Text>
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
        flexGrow: 1,
        marginLeft: 10
    }
});