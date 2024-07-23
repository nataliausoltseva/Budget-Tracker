import { useContext } from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

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
    return (
        <TouchableOpacity style={[{ backgroundColor: appState.isDarkMode ? "#A78DFF" : "#01B0E6" }, containerStyle]} onPress={onPress}>
            {Icon && (
                <Icon />
            )}
            {label && (
                <CustomText style={{ marginLeft: 10 }}>{label}</CustomText>
            )}
        </TouchableOpacity>
    )
}

export default Button;