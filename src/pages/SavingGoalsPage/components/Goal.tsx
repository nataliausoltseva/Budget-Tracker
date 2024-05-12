import { Button, CircularProgressBar, Icon, ProgressBar, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { formatDate, getDateDiffSeconds } from "../../../hooks/date";
import React, { useState } from "react";
import CountDown from 'react-native-countdown-fixed';
import AddModal from "./AddModal";

type Props = {
    goal: SavingGoalItem,
    onDelete: () => void,
    onEdit: () => void,
    onAdd: () => void,
}

const Goal = ({ goal, onDelete, onEdit, onAdd }: Props) => {
    const seconds = getDateDiffSeconds(goal.date);

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text>Name: {goal.name}</Text>
                <Text>Amount: {goal.amount.toString()}</Text>
                <Text>SavedAmount: {goal.savedAmount.toString()}</Text>
                <Text>Date: {formatDate(goal.date)}</Text>
            </View>
            <CircularProgressBar progress={goal.savedAmount / goal.amount} />
            <CountDown
                until={seconds || 0}
                onFinish={() => console.log('finished')}
                size={20}
                timeLabelStyle={styles.timeLabel}
                digitStyle={styles.time}
            />
            <View style={styles.actionContainer}>
                <Button accessoryLeft={<Icon name='trash' />} onPress={onDelete} appearance='ghost' status='danger' style={styles.button} />
                <Button accessoryLeft={<Icon name='edit' />} onPress={onEdit} appearance='ghost' status='primary' style={styles.button} />
                <Button accessoryLeft={<Icon name='plus' />} onPress={onAdd} appearance='ghost' status='primary' style={styles.button} />
            </View>
        </View>
    );
}

export default Goal;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    itemContainer: {
        marginBottom: 20
    },
    button: {
        width: 20
    },
    dueDateContainer: {
        flexDirection: "row"
    },
    timeLabel: {
        color: "white"
    },
    time: {
        backgroundColor: "#a3c2e3",
    },
    actionContainer: {
        flexDirection: "column"
    }
});
