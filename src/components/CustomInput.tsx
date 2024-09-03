import React, { useContext } from 'react';
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputChangeEventData, TextInputProps, TextStyle, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import CustomText from './CustomText';

type Props = {
    placeholder?: string,
    value?: string,
    onChange: (value: string) => void,
    otherProps?: TextInputProps,
    isNumeric?: boolean,
    style?: StyleProp<TextStyle> | undefined,
    isEditable?: boolean,
    label?: string,
    max?: number,
    min?: number,
}

const CustomInput = ({
    placeholder = "",
    label = "",
    value = "",
    isNumeric = false,
    isEditable = true,
    max = 0,
    min = 0,
    onChange,
    otherProps,
    style,
}: Props
) => {
    const appState = useContext(AppContext);

    const _onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        if (isNumeric && text) {
            const numericValue = parseFloat(text);
            if (numericValue > max) {
                onChange(max.toString());
            }

            if (numericValue < min) {
                onChange(min.toString());
            }
        }

        onChange(text);
    }

    const styles = StyleSheet.create({
        label: {
            fontSize: 12
        },
        input: {
            borderBottomColor: appState.isDarkMode ? "white" : "black",
            borderBottomWidth: 1,
            backgroundColor: appState.isDarkMode ? '#33294e' : "white",
            color: appState.isDarkMode ? "white" : "black",
            outlineStyle: 'none',
            padding: 0,
            opacity: isEditable ? 1 : 0.3
        }
    });

    return (
        <View>
            {label && (
                <CustomText style={styles.label}>{label}</CustomText>
            )}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={appState.isDarkMode ? "#ffffff80" : "#00000080"}
                value={value}
                onChange={_onChange}
                editable={isEditable}
                style={[styles.input, style]}
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