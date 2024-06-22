import React, { useContext } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputChangeEventData, TextInputProps, TextStyle } from 'react-native';
import { AppContext } from '../context/AppContext';

type Props = {
    placeholder?: string,
    value?: string,
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    otherProps?: TextInputProps,
    isNumeric?: boolean,
    style?: StyleProp<TextStyle> | undefined,
    isEditable?: boolean,
}

const CustomInput = ({ placeholder = "", value, onChange, isNumeric = false, isEditable = true, otherProps, style }: Props) => {
    const appState = useContext(AppContext);
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={appState.isDarkMode ? "#ffffff80" : "#00000080"}
            value={value}
            onChange={onChange}
            editable={isEditable}
            style={[
                style,
                {
                    borderBottomColor: appState.isDarkMode ? "white" : "black",
                    borderBottomWidth: 1,
                    backgroundColor: appState.isDarkMode ? '#443472' : "white",
                    color: appState.isDarkMode ? "white" : "black",
                    outlineStyle: 'none',
                    padding: 0,
                    opacity: isEditable ? 1 : 0.3
                }
            ]}
            {...{
                otherProps,
                ...isNumeric && {
                    keyboardType: "numeric",
                }
            }}

        />
    )
}

export default CustomInput;