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

    return (
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View style={{ justifyContent: "space-between", flexGrow: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <CustomText>Amount:</CustomText>
                    <CustomText>{item.amount.toString()}</CustomText>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <CustomText>Date:</CustomText>
                    <CustomText>{formatDate(item.date)}</CustomText>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 7, marginLeft: 10 }}>
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

const styles = StyleSheet.create({
    button: {
        width: 20
    },
});