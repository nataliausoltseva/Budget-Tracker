import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import CustomText from "../../../components/CustomText";
import ChevronIcon from "../../../components/ChevronIcon";
import { AppContext } from "../../../context/AppContext";
import TrashIcon from "../../../components/TrashIcon";
import UseIcon from "../../../components/UseIcon";

type Props = {
    item: IncomeHistoryItem,
    onDelete: () => void,
    onUse: () => void,
}

const HistoryItem = ({ item, onDelete, onUse }: Props) => {
    const appState = useContext(AppContext);
    const [isExpanded, setIsExpanded] = useState(false);

    const onToggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    }

    const style = StyleSheet.create({
        icon: {
            width: 20,
            transform: [{ rotate: `${isExpanded ? 180 : 0}deg` }]
        }
    });

    return (
        <>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <ChevronIcon onPress={onToggleExpand} style={style.icon} />
                    <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: "space-between", marginLeft: 10 }} >
                        <CustomText>{item.label}</CustomText>
                        <CustomText>{item.date}</CustomText>
                        <View style={{ flexDirection: 'row' }}>
                            <TrashIcon onPress={onDelete} />
                            <UseIcon onPress={onUse} colour={appState.isDarkMode ? "#04E2C7" : "#149890"} />
                        </View>
                    </View>
                </View>
                {isExpanded && (
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                            <CustomText>Amount</CustomText>
                            <CustomText>{item.currency} {item.amount} / {item.frequency.label}</CustomText>
                        </View>
                        {item.kiwiSaver && (
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                <CustomText>KiwiSaver</CustomText>
                                <CustomText>{item.kiwiSaver}%</CustomText>
                            </View>
                        )}
                        {(item.studentLoanRate || item.studentLoanThreshold) && (
                            <View>
                                <CustomText>Student Loan:</CustomText>
                                <View style={{ marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                        <CustomText>Rate:</CustomText>
                                        <CustomText>{item.studentLoanRate}%</CustomText>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                        <CustomText>Threshold:</CustomText>
                                        <CustomText>{item.studentLoanThreshold}%</CustomText>
                                    </View>
                                </View>
                            </View>
                        )}
                        {item.secondaryIncome && (
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                <CustomText>Secondary Income</CustomText>
                                <CustomText>{item.currency} {item.secondaryIncome} / Year</CustomText>
                            </View>
                        )}
                    </View>
                )}

            </View>
            <View style={{ height: 1, backgroundColor: appState.isDarkMode ? "white" : '#707070', marginBottom: 20, marginTop: 5 }} />
        </>

    )
}

export default HistoryItem;