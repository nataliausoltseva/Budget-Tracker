import { Button, CircularProgressBar, Icon, Text } from "@ui-kitten/components"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { formatDate, getDateDiffSeconds } from "../../../hooks/date";
import React, { useState } from "react";
import CountDown from 'react-native-countdown-fixed';
import GoalModal from "./GoalModal";
import TransactionModal from "./TransactionModal";
import TransactionItem from "./TransactionItem";
import { LineChart } from "react-native-gifted-charts";

type Props = {
    goal: SavingGoalItem,
    onDelete: () => void,
    onEdit: (g: SavingGoalItem) => void,
}

const Goal = ({ goal, onDelete, onEdit }: Props) => {
    const [editVisible, setEditVisible] = useState(false);
    const [transactionVisible, setTransactionVisible] = useState(false);
    const [isGoalExpanded, setIsGoalExpanded] = useState(false);


    const onGoalToggle = () => {
        setIsGoalExpanded((prevState: boolean) => !prevState);
    }

    const onTransactionAdd = (transaction: TransactionItem) => {
        const newTransactions = [...goal.transactions];
        newTransactions.push(transaction);
        goal.transactions = newTransactions;
        goal.savedAmount = goal.transactions.reduce((partialSum, item) => partialSum + item.amount, 0);
        onEdit(goal);
    }

    const onTransactionDelete = (index: number) => {
        const newTransactions = [...goal.transactions];
        newTransactions.splice(index, 1);
        goal.transactions = newTransactions;
        goal.savedAmount = goal.transactions.reduce((partialSum, item) => partialSum + item.amount, 0);
        onEdit(goal);
    }

    const onTransactionEdit = (index: number, transaction: TransactionItem) => {
        const newTransactions = [...goal.transactions];
        newTransactions[index] = transaction;
        goal.transactions = newTransactions;
        goal.savedAmount = goal.transactions.reduce((partialSum, item) => partialSum + item.amount, 0);
        onEdit(goal);
    }

    const seconds = getDateDiffSeconds(goal.date);
    const windowDimensions = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.goalContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Button accessoryLeft={<Icon name={'arrow-ios-downward'} />} onPress={onGoalToggle} appearance='ghost' style={buttonStyle(isGoalExpanded).icon} />
                    <Text>Name: {goal.name}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <Button accessoryLeft={<Icon name='trash' />} onPress={onDelete} appearance='ghost' status='danger' style={styles.button} />
                    <Button accessoryLeft={<Icon name='edit' />} onPress={() => setEditVisible(true)} appearance='ghost' status='primary' style={styles.button} />
                </View>
            </View>
            {isGoalExpanded && (
                <View style={{ alignItems: "flex-start", marginLeft: 35 }}>
                    <Text>Amount: {goal.amount.toString()}</Text>
                    <Text>Saved Amount: {goal.savedAmount.toString()}</Text>
                    <Text>Date: {formatDate(goal.date)}</Text>
                    <CountDown
                        until={seconds || 0}
                        size={20}
                        timeLabelStyle={styles.timeLabel}
                        digitStyle={styles.time}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>Transactions:</Text>
                        <Button accessoryLeft={<Icon name='plus' />} onPress={() => setTransactionVisible(true)} appearance='ghost' status='primary' style={styles.button} />
                    </View>
                    {goal.transactions.length > 0 && (
                        <View>
                            <View style={styles.transactionsContainer}>
                                {goal.transactions.map((item: TransactionItem, i: number) => (
                                    <TransactionItem
                                        key={i}
                                        item={item}
                                        onDelete={() => onTransactionDelete(i)}
                                        onEdit={(t: TransactionItem) => onTransactionEdit(i, t)}
                                    />
                                ))}
                            </View>
                            <View style={{ width: "90%" }}>
                                <LineChart
                                    data={goal.transactions.map((t: TransactionItem) => ({ value: t.totalSaved, label: t.date.toLocaleDateString() }))}
                                    data2={[]}
                                    height={250}
                                    width={windowDimensions.width - 100}
                                    initialSpacing={0}
                                    color1="skyblue"
                                    color2="orange"
                                    textColor1="green"
                                    dataPointsColor1="blue"
                                    dataPointsColor2="red"
                                    textShiftY={-2}
                                    textShiftX={-5}
                                    textFontSize={13}
                                    adjustToWidth
                                    showVerticalLines
                                />
                            </View>
                        </View>
                    )}

                </View>
            )}
            {editVisible && (
                <GoalModal
                    onSave={onEdit}
                    isVisible={true}
                    onClose={() => setEditVisible(false)}
                    goal={goal}
                />
            )}
            {transactionVisible && (
                <TransactionModal
                    goalTotalSaved={goal.savedAmount}
                    onSave={onTransactionAdd}
                    isVisible={true}
                    onClose={() => setTransactionVisible(false)}
                />
            )}
        </View>
    );
}

export default Goal;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginBottom: 20,
    },
    goalContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 30,
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
        flexDirection: "row"
    },
    transactionsContainer: {
        marginLeft: 20
    }
});

const buttonStyle = (isExpanded: boolean) => StyleSheet.create({
    icon: {
        width: 20,
        transform: [{ rotate: `${isExpanded ? 180 : 0}deg` }]
    }
})
