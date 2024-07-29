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
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: "flex-end",
                                flexDirection: 'row'
                            }}
                            activeOpacity={1}
                            onPress={() => setShow(false)}
                        >
                            <View
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    height: 256,
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{ marginTop: 20 }}>
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
    }

});