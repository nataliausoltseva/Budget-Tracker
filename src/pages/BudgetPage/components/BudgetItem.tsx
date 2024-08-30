import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
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

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        text: {
            fontSize: 18
        },
        diamond: {
            width: 15,
            height: 15,
            marginLeft: 5,
            marginRight: 10,
            backgroundColor: item.color,
            zIndex: 1,
            transform: [{ rotate: "45deg" }]
        },
        actions: {
            flexDirection: 'row'
        },
        divider: {
            height: 1,
            backgroundColor: appState.isDarkMode ? "white" : '#707070',
            marginTop: 10,
            marginBottom: 20
        }
    });

    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={styles.diamond} />
                    <CustomText style={styles.text}>{item.name}</CustomText>
                </View>
                <CustomText style={styles.text}>{item.value}/{item.frequency.name}</CustomText>
                <View style={styles.actions}>
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
            <View style={styles.divider} />
        </>
    );
}

export default BudgetItem;