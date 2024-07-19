import { View } from "react-native";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";

const HistoryModal = ({ data, onClose }: { data: any[], onClose: () => void }) => {
    console.log(data)
    return (
        <CustomModal onClose={onClose} isVisible>
            <CustomText>Income History Modal</CustomText>
            {data.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <CustomText>{item.label}&nbsp;&nbsp;&nbsp;{item.date}&nbsp;&nbsp;&nbsp; {item.amount}</CustomText>
                </View>
            ))}
        </CustomModal>
    )
}

export default HistoryModal;