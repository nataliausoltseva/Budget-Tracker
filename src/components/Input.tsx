import React from 'react';
import { KeyboardTypeOptions, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

type Props = {
    type: KeyboardTypeOptions,
    onChange: () => void
    value: string,
    placeholder: string,
    label: string,
}

const Input = ({ type = "default", onChange, value = "", placeholder = "", label = "" }: Props) => {
    return (
        <SafeAreaView>
            <Text>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                keyboardType={type}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Input;