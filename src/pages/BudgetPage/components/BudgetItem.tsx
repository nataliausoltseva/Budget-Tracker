import React, { useContext, useState } from "react";
import { View } from "react-native";
import CustomText from "../../../components/CustomText";
import TrashIcon from "../../../components/TrashIcon";
import PenIcon from "../../../components/PenIcon";
import BudgetItemModal from "./BudgetItemModal";
import { AppContext } from "../../../context/AppContext";

type Props = {
    item: ExpenseItem,
    onDelete: () => void,
    onSave: (item: ExpenseItem) => void
}

const BudgetItem = ({ item, onDelete, onSave }: Props) => {
    const appState = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);

    const _onSave = (newItem: ExpenseItem) => {
        onSave({
            ...item,
            ...newItem
        });
    }

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, marginLeft: 5, marginRight: 10, backgroundColor: item.color, zIndex: 1, transform: [{ rotate: "45deg" }] }} />
                    <CustomText style={{ fontSize: 18 }}>{item.name}</CustomText>
                </View>
                <CustomText style={{ fontSize: 18 }}>{item.value}/{item.frequency.name}</CustomText>
                <View style={{ flexDirection: 'row' }}>
                    <TrashIcon onPress={onDelete} />
                    <PenIcon onPress={() => setShowModal(true)} />
                </View>
                {showModal && (
                    <BudgetItemModal
                        expense={item}
                        onClose={() => setShowModal(false)}
                        onSave={_onSave}
                    />
                )}
            </View>
            <View style={{ height: 1, backgroundColor: appState.isDarkMode ? "white" : '#707070', marginTop: 10, marginBottom: 20 }} />
        </>
    );
}

export default BudgetItem;