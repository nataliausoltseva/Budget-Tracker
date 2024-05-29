import { Button, Icon, Text } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { formatDate } from "../../../hooks/date";
import InvestmentModal from "./InvestmentModal";
import InvestmentChart from "./InvestmentChart";

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
                    <Button
                        accessoryLeft={<Icon name={'arrow-ios-downward'} />}
                        onPress={onToggleExpand}
                        appearance='ghost'
                        style={buttonStyle(isExpanded).icon}
                    />
                    <Text>Name: {item.name}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        accessoryLeft={<Icon name='trash' />}
                        appearance='ghost'
                        status='danger'
                        style={styles.button}
                        onPress={onDelete}
                    />
                    <Button
                        accessoryLeft={<Icon name='edit' />}
                        appearance='ghost'
                        status='primary'
                        style={styles.button}
                        onPress={onToggleModal}
                    />
                </View>
            </View>
            {isExpanded && (
                <View style={{ alignItems: "flex-start", marginLeft: 35 }}>
                    <Text>Amount: {item.amount.toString()}</Text>
                    <Text>Rate: {item.rate.toString()}</Text>
                    <Text>Term: {item.term.toString()} {item.term > 1 ? `${item.termPeriod.name}s` : item.termPeriod.name} </Text>
                    <Text>Tax Rate: {item.taxRate.toString()}</Text>
                    <Text>Date: {formatDate(item.startDate)}</Text>
                    <InvestmentChart item={item} />
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
