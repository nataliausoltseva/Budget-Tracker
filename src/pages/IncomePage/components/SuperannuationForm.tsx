import React, { useRef } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';

type Props = {
    option: number,
    setSuperannuationOption: (option: number) => void,
    isEditable: boolean,
}

const SuperannuationForm = ({ option, setSuperannuationOption, isEditable = false }: Props) => {
    const inputHolder = useRef(option.toString());

    const onCustomOptionChange = (value: string) => {
        inputHolder.current = value || "";

        if (inputHolder.current) {
            setSuperannuationOption(parseFloat(inputHolder.current));
        } else if (!value) {
            setSuperannuationOption(0);
        }
        setSuperannuationOption(parseInt(value));
    }

    const styles = StyleSheet.create({
        contianer: {
            position: "relative",
            justifyContent: 'center'
        },
        input: {
            width: 50,
            marginLeft: 10
        },
        percent: {
            position: "absolute",
            right: 0,
            opacity: isEditable ? 1 : 0.3
        }
    })

    return (
        <SafeAreaView>
            <View style={styles.contianer}>
                <CustomInput
                    value={inputHolder.current}
                    onChange={onCustomOptionChange}
                    style={styles.input}
                    isEditable={isEditable}
                    max={100}
                    isNumeric
                />
                {inputHolder.current && (
                    <View style={styles.percent}>
                        <CustomText>%</CustomText>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default SuperannuationForm;