import { ScrollView } from "react-native";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import HistoryItem from "./HistoryItem";

type Props = {
    data: IncomeHistoryItem[],
    onClose: () => void,
    onDelete: (id: number) => void,
    onUse: (item: IncomeHistoryItem) => void,
}

const HistoryModal = ({ data, onClose, onDelete, onUse }: Props) => {
    return (
        <CustomModal onClose={onClose} style={{ width: 350 }} isVisible>
            <CustomText
                style={{ textAlign: "center", fontSize: 16, marginBottom: 10 }}
            >
                Your previous calculations
            </CustomText>
            <ScrollView style={{ maxHeight: 700 }}>
                {data.map((item, index) => (
                    <HistoryItem key={index} item={item} onDelete={() => onDelete(item.id)} onUse={() => onUse(item)} />
                ))}
            </ScrollView>
        </CustomModal >
    )
}

export default HistoryModal;