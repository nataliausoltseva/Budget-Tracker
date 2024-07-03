import { View } from "react-native";
import useTable from "../hooks/useTable";
import CustomText from "../../../components/CustomText";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const HEADERS = ["Year", "Contribution", "Returns", "Total"];

type Props = {
    item: InvestmentItem
}

const InvestmentList = ({ item }: Props) => {
    const appState = useContext(AppContext);
    const { data } = useTable({ item });
    return (
        <View style={{ flexGrow: 1, width: "100%", marginBottom: 20 }}>
            {new Array(data.length + 1).fill(0).map((_, index) => (
                <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                    {index === 0 ? (
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                {HEADERS.map((header: string, hIndex: number) => (
                                    <CustomText key={header} style={{ width: `${hIndex ? 28 : 15}%`, }}>{header}</CustomText>
                                ))}
                            </View>
                            <View style={{ height: 1, backgroundColor: appState.isDarkMode ? "white" : '#707070', marginLeft: -15, width: '100%', marginBottom: 5 }} />
                        </View>
                    ) : (
                        data[index - 1].map((value: number, valuIndex: number) => (
                            <CustomText key={valuIndex} style={{ width: `${valuIndex ? 28 : 15}%`, marginBottom: 10 }}>{value}</CustomText>
                        ))
                    )}
                </View>
            ))}
        </View>
    )
}

export default InvestmentList;
