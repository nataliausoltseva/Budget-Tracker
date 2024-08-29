import { useContext } from "react"
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { AppContext } from "../context/AppContext"
import CustomText from "./CustomText";

type Props = {
    onPress: () => void,
    Icon?: React.ComponentType,
    label?: string,
    containerStyle?: StyleProp<ViewStyle> | undefined,
}

const Button = ({ onPress, Icon, label = "", containerStyle, }: Props) => {
    const appState = useContext(AppContext);

    const styles = StyleSheet.create({
        label: {
            marginLeft: 10
        },
        container: {
            backgroundColor: appState.isDarkMode ? "#A78DFF" : "#01B0E6"
        }
    });
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            {Icon && (
                <Icon />
            )}
            {label && (
                <CustomText style={styles.label}>{label}</CustomText>
            )}
        </TouchableOpacity>
    )
}

export default Button;