import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { View } from "react-native";
import CustomText from "./CustomText";
import { Toggle } from "@ui-kitten/components";

type Props = {
    onToggle: (checked: boolean) => void
}

const DarkModeToggle = ({ onToggle }: Props) => {
    const appState = useContext(AppContext);

    const _onToggle = (checked: boolean) => {
        appState.setIsDarkMode(checked);
        onToggle(checked);
    }

    return (
        <View style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 20 }}>
            <View style={{ alignItems: "center" }}>
                <CustomText>Dark mode</CustomText>
                <Toggle
                    checked={appState.isDarkMode}
                    onChange={_onToggle}
                />
            </View>
        </View>
    )
}
export default DarkModeToggle;