import { useContext } from "react"
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native"
import { AppContext } from "../context/AppContext"

type Props = {
    children: React.ReactNode,
    style?: StyleProp<TextStyle> | undefined,
    onPress?: () => void,
}

const CustomText = ({ children, style, onPress }: Props) => {
    const appState = useContext(AppContext);
    const styles = StyleSheet.create({
        text: {
            color: appState.isDarkMode ? "white" : "black"
        }
    })
    return (
        <Text style={[styles.text, style]} onPress={onPress}>{children}</Text>
    )
}
export default CustomText;

