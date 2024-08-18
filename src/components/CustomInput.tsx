import React, { useContext } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputChangeEventData, TextInputProps, TextStyle, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import CustomText from './CustomText';

type Props = {
    placeholder?: string,
    value?: string,
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    otherProps?: TextInputProps,
    isNumeric?: boolean,
    style?: StyleProp<TextStyle> | undefined,
    isEditable?: boolean,
    label?: string,
}

const CustomInput = ({ placeholder = "", value, onChange, isNumeric = false, isEditable = true, otherProps, style, label }: Props) => {
    const appState = useContext(AppContext);
    return (
        <View>
            {label && (
                <CustomText style={{ fontSize: label ? 12 : 8 }}>{label}</CustomText>
            )}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={appState.isDarkMode ? "#ffffff80" : "#00000080"}
                value={value}
                onChange={onChange}
                editable={isEditable}
                style={[
                    {
                        borderBottomColor: appState.isDarkMode ? "white" : "black",
                        borderBottomWidth: 1,
                        backgroundColor: appState.isDarkMode ? '#33294e' : "white",
                        color: appState.isDarkMode ? "white" : "black",
                        outlineStyle: 'none',
                        padding: 0,
                        opacity: isEditable ? 1 : 0.3
                    },
                    style
                ]}
                {...{
                    otherProps,
                    ...isNumeric && {
                        keyboardType: "numeric",
                    }
                }}
            />
        </View>
    )
}

export default CustomInput;