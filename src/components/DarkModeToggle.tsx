import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { View } from "react-native";
import CustomToggle from "./CustomToggle";

type Props = {
    onToggle: () => void
}

const DarkModeToggle = ({ onToggle }: Props) => {
    const appState = useContext(AppContext);

    const _onToggle = () => {
        appState.setIsDarkMode(prevState => !prevState);
        onToggle();
    }

    return (
        <View style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 20 }}>
            <View style={{ alignItems: "center" }}>
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