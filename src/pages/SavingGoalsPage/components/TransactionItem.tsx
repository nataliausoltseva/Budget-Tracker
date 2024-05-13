import { Text } from "@ui-kitten/components";
import { View } from "react-native";
import { formatDate } from "../../../hooks/date";

type Props = {
    item: TransactionItem
}

const TransactionItem = ({ item }: Props) => {
    return (
        <View>
            <Text>Amount: {item.amount.toString()}</Text>
            <Text>Date: {formatDate(item.date)}</Text>
        </View>
    );
}

export default TransactionItem;