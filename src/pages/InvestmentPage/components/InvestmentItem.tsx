import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { formatDate } from "../../../hooks/date";
import InvestmentModal from "./InvestmentModal";
import InvestmentChart from "./InvestmentChart";
import InvestmentList from "./InvestmentList";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";
import ChevronIcon from "../../../components/ChevronIcon";
import { AppContext } from "../../../context/AppContext";
import CountDown from 'react-native-countdown-fixed';
import useCountdown from "../hooks/useCountdown";

type Props = {
    item: InvestmentItem,
    onItemChange: (item: InvestmentItem) => void,
    onDelete: () => void,
}

const InvestmentItem = ({ item, onItemChange, onDelete }: Props) => {
    const appState = useContext(AppContext);
    const [random, setRandom] = useState(Math.random());
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { seconds } = useCountdown({
        startDate: item.startDate,
        numMonths: item.termPeriod.name === "month" ? item.term : item.term * 12,
    });

    const onToggleExpand = () => setIsExpanded((prevState: boolean) => !prevState);
    const onToggleModal = () => setIsModalVisible((prevState: boolean) => !prevState);
    const _onItemChange = (item: InvestmentItem) => {
        setRandom(Math.random());
        onItemChange(item);
    }

    const themeStyles = StyleSheet.create({
        timeLabel: {
            color: appState.isDarkMode ? "white" : "black",
            textTransform: "lowercase"
        },
        time: {
            backgroundColor: appState.isDarkMode ? '#443472' : "white",
            borderColor: appState.isDarkMode ? "#A78DFF" : "#01B0E6",
            borderWidth: 1,
            width: 40
        },
    });

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
            marginBottom: 30
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
        },
        topContainer: {
            flexDirection: "row",
            alignItems: "center"
        },
        topTitle: {
            marginLeft: 15
        },
        countDownContainer: {
            marginTop: 15
        },
        color: {
            color: appState.isDarkMode ? "white" : "black"
        },
        expandedContainer: {
            alignItems: "flex-start",
            marginLeft: 35
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%"
        },
        date: {
            marginBottom: 10
        },
        divider: {
            height: 1,
            backgroundColor: appState.isDarkMode ? "white" : '#707070',
            marginBottom: 20
        },
        buttonIcon: {
            width: 20,
            transform: [{ rotate: `${isExpanded ? 180 : 0}deg` }]
        }
    });

    return (
        <>
            <View>
                <View style={styles.goalContainer}>
                    <View style={styles.topContainer}>
                        <ChevronIcon onPress={onToggleExpand} style={styles.buttonIcon} />
                        <CustomText style={styles.topTitle}>{item.name}</CustomText>

                    </View>
                    <View style={styles.countDownContainer}>
                        <CountDown
                            key={random}
                            until={seconds || 0}
                            size={15}
                            timeLabelStyle={themeStyles.timeLabel}
                            digitStyle={themeStyles.time}
                            digitTxtStyle={styles.color}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <TrashIcon onPress={onDelete} />
                        <PenIcon onPress={onToggleModal} />
                    </View>
                </View>
                {isExpanded && (
                    <View style={styles.expandedContainer}>
                        <View style={styles.row}>
                            <CustomText>Amount:</CustomText>
                            <CustomText>{item.amount.toString()}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Rate:</CustomText>
                            <CustomText>{item.rate.toString()}%</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Term:</CustomText>
                            <CustomText>{item.term.toString()} {item.term > 1 ? `${item.termPeriod.name}s` : item.termPeriod.name}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Tax Rate:</CustomText>
                            <CustomText>{item.taxRate.toString()}%</CustomText>
                        </View>
                        <View style={[styles.row, styles.date]}>
                            <CustomText>Date:</CustomText>
                            <CustomText>{formatDate(item.startDate)}</CustomText>
                        </View>
                        <InvestmentChart item={item} key={`chart-${random}`} />
                        <InvestmentList item={item} key={`list-${random}`} />
                    </View>
                )}
                {isModalVisible && (
                    <InvestmentModal
                        investment={item}
                        onSave={_onItemChange}
                        onClose={() => setIsModalVisible(false)}
                    />
                )}
            </View >
            <View style={styles.divider} />
        </>
    )
};

export default InvestmentItem;