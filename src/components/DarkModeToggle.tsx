import { useContext, useEffect } from "react"
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from "../context/AppContext"
import CustomToggle from "./CustomToggle";

type Props = {
    onToggle: (value: boolean | null | undefined) => void
}

const DarkModeToggle = ({ onToggle }: Props) => {
    const appState = useContext(AppContext);

    useEffect(() => {
        async function getMode() {
            const darkModeValue: string | null = await AsyncStorage.getItem('isDarkMode');
            if (darkModeValue !== null) {
                _onToggle(Boolean(darkModeValue));
            }
        }

        getMode();
    }, []);

    const _onToggle = (isDarkMode?: boolean | null) => {
        if (isDarkMode && isDarkMode !== null) {
            appState.setIsDarkMode(isDarkMode);
        } else {
            appState.setIsDarkMode(prevState => !prevState);
        }
        onToggle(isDarkMode);
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <CustomToggle
                    isChecked={appState.isDarkMode}
                    onChange={_onToggle}
                    label="Dark mode"
                />
            </View>
        </View>
    )
}
export default DarkModeToggle;

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        marginRight: 20,
        marginBottom: 20
    },
    wrapper: {
        alignItems: "center"
    }
});