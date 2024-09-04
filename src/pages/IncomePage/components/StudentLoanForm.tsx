import React from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
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
    const onRateChange = (value: string) => {
        setRate(parseFloat(value));
    }

    const onThresholdChange = (value: string) => {
        setThreshold(parseFloat(value));
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row"
        },
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
        },
        editable: {
            opacity: isEditable ? 1 : 0.3
        },
        wrapper: {
            position: "relative",
            justifyContent: "center"
        },
        percent: {
            position: "absolute",
            right: 0,
        },
        margin: {
            marginLeft: 10
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <CustomText style={styles.editable}>Rate:</CustomText>
                <View style={styles.wrapper}>
                    <CustomInput
                        style={styles.input}
                        value={rate.toString()}
                        onChange={onRateChange}
                        isEditable={isEditable}
                        max={100}
                        isNumeric
                    />
                    {rate && (
                        <View style={[styles.percent, styles.editable]}>
                            <CustomText>%</CustomText>
                        </View>
                    )}
                </View>
            </View>
            <View style={[styles.view, styles.margin]}>
                <CustomText style={styles.editable}>Threshold:</CustomText>
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