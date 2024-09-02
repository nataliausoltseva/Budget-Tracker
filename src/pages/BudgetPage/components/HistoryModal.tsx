import { ScrollView, StyleSheet } from "react-native";

import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import HistoryItem from "./HistoryItem";

type Props = {
    data: BudgetHistoryItem[],
    onClose: () => void,
    onDelete: (id: number) => void,
    onUse: (item: BudgetHistoryItem) => void,
}

const HistoryModal = ({ data, onClose, onDelete, onUse }: Props) => {
    const styles = StyleSheet.create({
        modal: {
            width: 350
        },
        title: {
            textAlign: "center",
            fontSize: 16,
            marginBottom: 10
        },
        container: {
            maxHeight: 700
        }
    });

    return (
        <CustomModal onClose={onClose} style={styles.modal} isVisible>
            <CustomText style={styles.title}>
                Your previous calculations
            </CustomText>
            <ScrollView style={styles.container}>
                {data.map((item, index) => (
                    <HistoryItem key={index} item={item} onDelete={() => onDelete(item.id)} onUse={() => onUse(item)} />
                ))}
            </ScrollView>
        </CustomModal >
    )
}

export default HistoryModal;