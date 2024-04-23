import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';

const IncomePage = () => {
    const incomeOptions = [
        {
            placeholder: "Insert Income",
            label: "Income before tax",
        },
        {
            placeholder: "Insert income period",
            label: "Income period",
        },
    ];

    return (
        <SafeAreaView>
            <Text>Income</Text>
            <View style={styles.view}>
                {incomeOptions.map((option: any) => (
                    <Input
                        type={'default'}
                        onChange={console.log}
                        value={''}
                        placeholder={option.placeholder}
                        label={option.label}
                    />
                ))}
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    view: {
        display: "flex"
    },
});

export default IncomePage;