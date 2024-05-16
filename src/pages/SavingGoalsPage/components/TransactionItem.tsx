import { Button, Icon, Text } from "@ui-kitten/components";
import { RootTagContext, StyleSheet, View } from "react-native";
import { formatDate } from "../../../hooks/date";
import { useState } from "react";
import TransactionModal from "./TransactionModal";

type Props = {
    item: TransactionItem,
    onDelete: () => void,
    onEdit: (transaction: TransactionItem) => void,
}

const TransactionItem = ({ item, onDelete, onEdit }: Props) => {
    const [editVisible, setEditVisible] = useState(false);

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
                <Text>Amount: {item.amount.toString()}</Text>
                <Text>Date: {formatDate(item.date)}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Button accessoryLeft={<Icon name='trash' />} onPress={onDelete} appearance='ghost' status='danger' style={styles.button} />
                <Button accessoryLeft={<Icon name='edit' />} onPress={() => setEditVisible(true)} appearance='ghost' status='primary' style={styles.button} />
            </View>
            {editVisible && (
                <TransactionModal
                    amountValue={item.amount.toString()}
                    dateValue={item.date}
                    onSave={onEdit}
                    isVisible={true}
                    onClose={() => setEditVisible(false)}
                />
            )}
        </View>
    );
}

export default TransactionItem;

const styles = StyleSheet.create({
    button: {
        width: 20
    },
});