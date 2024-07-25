import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GoalModal from './components/GoalModal';
import Goal from './components/Goal';
import CustomText from '../../components/CustomText';
import { AppContext } from '../../context/AppContext';

type Props = {
    isHidden: boolean
}

const SavingGoalsPage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const [goals, setGoals] = useState<SavingGoalItem[]>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await AsyncStorage.getItem('savingGoalsData');
            if (data !== null) {
                setGoals(JSON.parse(data));
            }
        }

        getData();
    }, []);

    const onAddGoal = (goal: SavingGoalItem) => {
        setGoals((prevState: SavingGoalItem[]) => {
            const newGoals = [...prevState];
            newGoals.push(goal);
            onSaveData(newGoals);
            return newGoals;
        });
        setVisible(false);
    }

    const onDeleteGoal = (index: number) => {
        setGoals((prevState: SavingGoalItem[]) => {
            const newGoals = [...prevState];
            newGoals.splice(index, 1);
            onSaveData(newGoals);
            return newGoals;
        });
    }

    const onEdit = (goal: SavingGoalItem, index: number) => {
        setGoals((prevState: SavingGoalItem[]) => {
            const newGoals = [...prevState];
            newGoals[index] = goal;
            onSaveData(newGoals);
            return newGoals;
        });
    }

    const onSaveData = async (newGoals?: SavingGoalItem[]) => {
        await AsyncStorage.setItem('savingGoalsData', JSON.stringify(newGoals || goals));
    }

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Add" onPress={() => setVisible(true)} color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"} />
        </View>
    )

    const sortedGoals = useMemo(() => (
        goals.sort((a, b) => new Date(a.date.toString()).getTime() > new Date(b.date.toString()).getTime() ? -1 : 1)
    ), [goals]);

    return (
        <View style={containerStyles(isHidden).container}>
            {goals.length ? (
                <ScrollView>
                    {sortedGoals.map((goal: SavingGoalItem, index: number) => (
                        <Goal
                            key={index}
                            goal={goal}
                            onDelete={() => onDeleteGoal(index)}
                            onEdit={(g: SavingGoalItem) => onEdit(g, index)}
                        />
                    ))}
                    {renderButton()}
                </ScrollView>
            ) : (
                <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                    <CustomText style={{ marginBottom: 20 }}>Add you first goal</CustomText>
                    {renderButton()}
                </View>
            )}
            {visible && (
                <GoalModal
                    onSave={onAddGoal}
                    isVisible={visible}
                    onClose={() => setVisible(false)}
                />
            )}
        </View>
    );
}

export default memo(SavingGoalsPage);

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
        flexGrow: 1
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