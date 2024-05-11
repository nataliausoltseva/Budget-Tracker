import { Button, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddModal from './components/AddModal';
import Goal from './components/Goal';

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

    const onDeleteGoal = (index: number) => {
        setGoals((prevState: SavingGoalItem[]) => {
            const newGoals = [...prevState];
            newGoals.splice(index, 1);
            return newGoals;
        });
    }

    return (
        <View style={containerStyles(isHidden).container}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => setVisible(true)} style={styles.button}>
                    Add
                </Button>
            </View>
            {!!goals.length && (
                <View>
                    {goals.map((goal: SavingGoalItem, index: number) => (
                        <Goal key={index} goal={goal} onDelete={() => onDeleteGoal(index)} />
                    ))}
                </View>
            )}
            <AddModal onSave={onAddGoal} isVisible={visible} onClose={() => setVisible(false)} />
        </View>
    );
}

export default SavingGoalsPage;

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
    },
});

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "flex-end"
    },
    button: {
        width: 100,
    },
});