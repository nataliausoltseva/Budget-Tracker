import { Text } from "react-native";
import CustomModal from "../../../components/CustomModal";

const HistoryModal = ({ data, onClose }: { data: any[], onClose: () => void }) => {
    console.log(data)
    return (
        <CustomModal onClose={onClose} isVisible>
            <Text>Budget History Modal</Text>
        </CustomModal>
    )
}

export default HistoryModal;