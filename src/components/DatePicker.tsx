import { Modal, StyleProp, StyleSheet, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomText from "./CustomText";

type Props = {
    onChange: (date: Date) => void,
    value: Date,
    min?: Date,
    style?: StyleProp<ViewStyle>
}

const DatePicker = ({ onChange, value, min, style }: Props) => {
    const [date, setDate] = useState<Date>(value || new Date());
    const [show, setShow] = useState<boolean>(false);

    const _onChange = (e: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            onChange(selectedDate)
        }
    }

    return (
        <TouchableOpacity onPress={() => setShow(true)}>
            <View>
                <CustomText style={styles.textStyle}>{date.toDateString()}</CustomText>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={show}
                    supportedOrientations={['portrait']}
                    onRequestClose={() => setShow(false)}
                >
                    <View style={styles.wrapper}>
                        <TouchableHighlight
                            style={styles.clickableContainer}
                            activeOpacity={1}
                            onPress={() => setShow(false)}
                        >
                            <View style={styles.contianer}>
                                <View style={styles.picker}>
                                    <DateTimePicker
                                        value={date}
                                        mode={"date"}
                                        onChange={_onChange}
                                        style={style}
                                        {...min && {
                                            minimumDate: min
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    )
}

export default DatePicker;

const styles = StyleSheet.create({
    textStyle: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    picker: {
        marginTop: 20
    },
    contianer: {
        backgroundColor: "#FFFFFF",
        height: 256,
        overflow: "hidden"
    },
    clickableContainer: {
        flex: 1,
        alignItems: "flex-end",
        flexDirection: 'row'
    },
    wrapper: {
        flex: 1
    }

});