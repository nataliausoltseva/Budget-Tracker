import { Button, Icon, IndexPath, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { FREQUENCES } from '../BudgetPage';

type Props = {
    name: string,
    amount: string,
    fruquencyIndex: IndexPath | IndexPath[],
    onNameChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    onAmountChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    onFrequenceChange: (selectedIndex: IndexPath | IndexPath[]) => void,
    hasDeleteButton?: boolean,
    onDelete?: () => void
}

const BudgetItem = ({ name = "", amount = "", fruquencyIndex, onNameChange, onAmountChange, onFrequenceChange, hasDeleteButton = false, onDelete }: Props) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Input
                placeholder='Enter expense name'
                value={name}
                onChange={onNameChange}
                style={{ maxWidth: 200 }}
            />
            <View style={styles.incomeView}>
                <Input
                    value={amount}
                    onChange={onAmountChange}
                    style={{ minWidth: 100 }}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
                <Text style={styles.dollarSign}>$</Text>
            </View>
            <Layout level='1' style={{ flexGrow: 1, height: 0 }}>
                <Select
                    selectedIndex={fruquencyIndex}
                    onSelect={onFrequenceChange}
                    value={FREQUENCES[fruquencyIndex.row].name}
                >
                    {FREQUENCES.map((item: FrequencyItem) => (
                        <SelectItem title={item.name} key={item.key} />
                    ))}
                </Select>
            </Layout>
            {hasDeleteButton && (
                <Button accessoryLeft={<Icon name='trash' />} onPress={onDelete} appearance='ghost' status='danger' style={styles.button} />
            )}
        </View>
    );
}

export default BudgetItem;

const styles = StyleSheet.create({
    incomeView: {
        display: "flex",
        flexDirection: 'row',
        position: "relative"
    },
    container: {
        minWidth: 150
    },
    input: {
        flexGrow: 1
    },
    dollarSign: {
        position: "absolute",
        zIndex: 5,
        color: "red",
        top: "28%",
        left: "2%",
    },
    button: {
        width: 20
    }
});