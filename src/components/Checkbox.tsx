import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CheckboxIcon from "./CheckboxIcon";
import CustomText from "./CustomText";

type Props = {
    isChecked: boolean,
    onPress: (isChecked: boolean) => void,
    label: string
}

const CheckBox = ({ isChecked = false, onPress, label }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(!isChecked)}>
            <CheckboxIcon isChecked={isChecked} onPress={() => onPress(!isChecked)} />
            <CustomText style={styles.label}>{label}</CustomText>
        </TouchableOpacity>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        position: 'relative',
        zIndex: 2,
    },
    label: {
        marginLeft: 5,
    },
});