import { StyleSheet, View } from "react-native";
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
        <View style={styles.container}>
            <CheckboxIcon onPress={() => onPress(!isChecked)} isChecked={isChecked} />
            <CustomText style={styles.label}>{label}</CustomText>
        </View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    label: {
        marginLeft: 5,
    },
});