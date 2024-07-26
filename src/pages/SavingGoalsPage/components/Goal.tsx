import { StyleSheet, View, useWindowDimensions } from "react-native"
import { formatDate, getDateDiffSeconds } from "../../../hooks/date";
import React, { useContext, useState } from "react";
import CountDown from 'react-native-countdown-fixed';
import { LineChart } from "react-native-gifted-charts";

import GoalModal from "./GoalModal";
import TransactionModal from "./TransactionModal";
import TransactionItem from "./TransactionItem";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";
import ChevronIcon from "../../../components/ChevronIcon";
import { AppContext } from "../../../context/AppContext";
import PlusIcon from "../../../components/PlusIcon";

type Props = {
    goal: SavingGoalItem,
    onDelete: () => void,
    onEdit: (g: SavingGoalItem) => void,
}

const Goal = ({ goal, onDelete, onEdit }: Props) => {
    const appState = useContext(AppContext);
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

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            marginBottom: 20,
        },
        goalContainer: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
        },
        button: {
            width: 20
        },
        dueDateContainer: {
            flexDirection: "row"
        },
        timeLabel: {
            color: appState.isDarkMode ? "white" : "black",
            textTransform: "lowercase"
        },
        time: {
            backgroundColor: appState.isDarkMode ? '#443472' : "white",
            borderColor: appState.isDarkMode ? "#A78DFF" : "#01B0E6",
            borderWidth: 1,
        },
        actionContainer: {
            flexDirection: "row"
        },
        transactionsContainer: {
            marginLeft: 20
        }
    });

    const graphColor = appState.isDarkMode ? "white" : "black";

    return (
        <>
            <View style={styles.container}>
                <View style={styles.goalContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <ChevronIcon onPress={onGoalToggle} style={buttonStyle(isGoalExpanded).icon} />
                        <CustomText style={{ marginLeft: 15 }}>{goal.name}</CustomText>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <CountDown
                            until={seconds || 0}
                            size={15}
                            timeLabelStyle={styles.timeLabel}
                            digitStyle={styles.time}
                            digitTxtStyle={{ color: appState.isDarkMode ? "white" : "black" }}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <TrashIcon onPress={onDelete} />
                        <PenIcon onPress={() => setEditVisible(true)} />
                    </View>
                </View>
                {isGoalExpanded && (
                    <View style={{ alignItems: "flex-start", marginLeft: 35 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <CustomText>Amount:</CustomText>
                            <CustomText>{goal.amount.toString()}</CustomText>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <CustomText>Saved amount:</CustomText>
                            <CustomText>{goal.savedAmount.toString()}</CustomText>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <CustomText>Date by:</CustomText>
                            <CustomText>{formatDate(new Date(goal.date.toString()))}</CustomText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <CustomText>Transactions:</CustomText>
                            <PlusIcon onPress={() => setTransactionVisible(true)} style={{ marginLeft: 10 }} />
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
                                    <LineChart
                                        data={graphData}
                                        data2={graphData.map(_ => ({ value: goal.amount }))}
                                        height={250}
                                        width={windowDimensions.width - 100}
                                        initialSpacing={0}
                                        color1={graphColor}
                                        color2={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                                        dataPointsColor1={graphColor}
                                        dataPointsColor2={graphColor}
                                        textShiftY={-2}
                                        textFontSize={13}
                                        yAxisColor={graphColor}
                                        xAxisColor={graphColor}
                                        yAxisTextStyle={{
                                            color: appState.isDarkMode ? "white" : "black"
                                        }}
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
            <View style={{ height: 1, backgroundColor: appState.isDarkMode ? "white" : '#707070', marginBottom: 20 }} />
        </>
    );
}

export default Goal;

const buttonStyle = (isExpanded: boolean) => StyleSheet.create({
    icon: {
        width: 20,
        transform: [{ rotate: `${isExpanded ? 180 : 0}deg` }]
    }
})
