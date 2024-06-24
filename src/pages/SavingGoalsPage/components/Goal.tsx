import { Button, Icon } from "@ui-kitten/components"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { formatDate, getDateDiffSeconds } from "../../../hooks/date";
import React, { useState } from "react";
import CountDown from 'react-native-countdown-fixed';
import GoalModal from "./GoalModal";
import TransactionModal from "./TransactionModal";
import TransactionItem from "./TransactionItem";
import { LineChart } from "react-native-gifted-charts";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";
import ChevronIcon from "../../../components/ChevronIcon";

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
    const graphData = goal.transactions.length ? [
        ...[{ value: goal.transactions[0].totalSaved === goal.transactions[0].amount ? 0 : goal.transactions[0].totalSaved - goal.transactions[0].amount }],
        ...goal.transactions.map((t: TransactionItem) => ({ value: t.totalSaved }))
    ] : [];

    return (
        <View style={styles.container}>
            <View style={styles.goalContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ChevronIcon onPress={onGoalToggle} style={buttonStyle(isGoalExpanded).icon} />
                    <CustomText>Name: {goal.name}</CustomText>
                </View>
                <View style={styles.actionContainer}>
                    <TrashIcon onPress={onDelete} />
                    <PenIcon onPress={() => setEditVisible(true)} />
                </View>
            </View>
            {isGoalExpanded && (
                <View style={{ alignItems: "flex-start", marginLeft: 35 }}>
                    <CustomText>Amount: {goal.amount.toString()}</CustomText>
                    <CustomText>Saved Amount: {goal.savedAmount.toString()}</CustomText>
                    <CustomText>Date: {formatDate(goal.date)}</CustomText>
                    <CountDown
                        until={seconds || 0}
                        size={20}
                        timeLabelStyle={styles.timeLabel}
                        digitStyle={styles.time}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <CustomText>Transactions:</CustomText>
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
                            <View>
                                <CustomText>Your saving progress:</CustomText>
                                <LineChart
                                    data={graphData}
                                    data2={graphData.map(_ => ({ value: goal.amount }))}
                                    height={250}
                                    width={windowDimensions.width - 100}
                                    initialSpacing={0}
                                    color1="skyblue"
                                    color2="orange"
                                    textColor1="green"
                                    dataPointsColor1="blue"
                                    dataPointsColor2="red"
                                    textShiftY={-2}
                                    textFontSize={13}
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
