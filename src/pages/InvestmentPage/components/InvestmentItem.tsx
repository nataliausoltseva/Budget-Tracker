import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { formatDate } from "../../../hooks/date";
import InvestmentModal from "./InvestmentModal";
import InvestmentChart from "./InvestmentChart";
import InvestmentList from "./InvestmentList";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";
import ChevronIcon from "../../../components/ChevronIcon";

type Props = {
    item: InvestmentItem,
    onItemChange: (item: InvestmentItem) => void,
    onDelete: () => void,
}

const InvestmentItem = ({ item, onItemChange, onDelete }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onToggleExpand = () => setIsExpanded((prevState: boolean) => !prevState);
    const onToggleModal = () => setIsModalVisible((prevState: boolean) => !prevState);

    return (
        <View>
            <View style={styles.goalContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ChevronIcon onPress={onToggleExpand} style={buttonStyle(isExpanded).icon} />
                    <CustomText>Name: {item.name}</CustomText>
                </View>
                <View style={styles.actionContainer}>
                    <TrashIcon onPress={onDelete} />
                    <PenIcon onPress={onToggleModal} />
                </View>
            </View>
            {isExpanded && (
                <View style={{ alignItems: "flex-start", marginLeft: 35 }}>
                    <CustomText>Amount: {item.amount.toString()}</CustomText>
                    <CustomText>Rate: {item.rate.toString()}</CustomText>
                    <CustomText>Term: {item.term.toString()} {item.term > 1 ? `${item.termPeriod.name}s` : item.termPeriod.name} </CustomText>
                    <CustomText>Tax Rate: {item.taxRate.toString()}</CustomText>
                    <CustomText>Date: {formatDate(item.startDate)}</CustomText>
                    <InvestmentChart item={item} />
                    <InvestmentList item={item} />
                </View>
            )}
            {isModalVisible && (
                <InvestmentModal
                    investment={item}
                    onSave={onItemChange}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </View>
    )
};

export default InvestmentItem;

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
