import { useContext } from "react"
import { StyleSheet, Text } from "react-native"
import { AppContext } from "../context/AppContext"

type Props = {
    children: React.ReactNode
}

const CustomText = ({ children }: Props) => {
    const appState = useContext(AppContext);
    const styles = StyleSheet.create({
        text: {
            color: appState.isDarkMode ? "white" : "black"
        }
    })
    return (
        <Text style={styles.text}>{children}</Text>
    )
}
export default CustomText;

