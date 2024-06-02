import { ListItem } from "@ui-kitten/components";
import { View } from "react-native";
import useTable from "../hooks/useTable";

const HEADERS = ["Year", "Contribution", "Returns", "Total"];

type Props = {
    item: InvestmentItem
}

const InvestmentList = ({ item }: Props) => {
    const { data } = useTable({ item });
    return (
        <View style={{ flexGrow: 1, width: "100%" }}>
            {new Array(data.length + 1).fill(0).map((_, index) => (
                <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                    {index === 0 ? (
                        HEADERS.map((header: string) => (
                            <ListItem title={header} style={{ flexGrow: 1 }} key={header || 'header-0'} />
                        ))
                    ) : (
                        data[index - 1].map((value: number, valuIndex: number) => (
                            <ListItem title={value} style={{ flexGrow: 1 }} key={valuIndex} />
                        ))
                    )}
                </View>
            ))}
        </View>
    )
}

export default InvestmentList;
