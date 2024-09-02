import { StyleSheet, View } from "react-native";
import { formatDate } from "../../../hooks/date";
import { useState } from "react";
import TransactionModal from "./TransactionModal";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";

type Props = {
    item: TransactionItem,
    onDelete: () => void,
    onEdit: (transaction: TransactionItem) => void,
}

const TransactionItem = ({ item, onDelete, onEdit }: Props) => {
    const [editVisible, setEditVisible] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            marginBottom: 15
        },
        wrapper: {
            justifyContent: "space-between",
            flexGrow: 1
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        actions: {
            flexDirection: "row",
            marginTop: 7,
            marginLeft: 10
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.row}>
                    <CustomText>Amount:</CustomText>
                    <CustomText>{item.amount.toString()}</CustomText>
                </View>
                <View style={styles.row}>
                    <CustomText>Date:</CustomText>
                    <CustomText>{formatDate(item.date)}</CustomText>
                </View>
            </View>
            <View style={styles.actions}>
                <TrashIcon onPress={onDelete} />
                <PenIcon onPress={() => setEditVisible(true)} />
            </View>
            {editVisible && (
                <TransactionModal
                    transaction={item}
                    onSave={onEdit}
                    isVisible={true}
                    onClose={() => setEditVisible(false)}
                />
            )}
        </View>
    );
}

export default TransactionItem;
