import { Button, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddModal from './components/AddModal';

type Props = {
    isHidden: boolean
}

const SavingGoalsPage = ({ isHidden = false }: Props) => {
    const [visible, setVisible] = useState(false);
    const [goals, setGoals] = useState<SavingGoalItem[]>([]);

    const onAddGoal = (goal: SavingGoalItem) => {
        setGoals((prevState: SavingGoalItem[]) => {
            const newGoals = [...prevState];
            newGoals.push(goal);
            return newGoals;
        });
        setVisible(false);
    }

    return (
        <View style={containerStyles(isHidden).container}>
            {!!goals.length && (
                <View>
                    {goals.map((goal: SavingGoalItem, index: number) => (
                        <View key={index}>
                            <Text>Name: {goal.name}</Text>
                            <Text>Amount: {goal.amount.toString()}</Text>
                            <Text>SavedAmount: {goal.savedAmount.toString()}</Text>
                            <Text>Date: {formatDate(goal.date)}</Text>
                        </View>
                    ))}
                </View>
            )}
            <AddModal onSave={onAddGoal} isVisible={visible} onClose={() => setVisible(false)} />
            <Button onPress={() => setVisible(true)} style={styles.button}>
                Add
            </Button>
        </View>
    );
}

export default SavingGoalsPage;

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
});

const styles = StyleSheet.create({
    button: {
        width: 100
    }
});

const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
    const month1 = formatter.format(newDate);
    return newDate.getDate() + " " + month1 + " " + newDate.getFullYear();
}