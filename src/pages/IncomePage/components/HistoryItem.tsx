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
        },
        container: {
            width: '100%'
        },
        topContainer: {
            flexDirection: 'row',
            alignItems: "center"
        },
        title: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: "space-between",
            marginLeft: 10
        },
        actions: {
            flexDirection: 'row'
        },
        flexCenterContainer: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between"
        },
        studentLoanContainer: {
            marginLeft: 10
        },
        divider: {
            height: 1,
            backgroundColor: appState.isDarkMode ? "white" : '#707070',
            marginBottom: 20,
            marginTop: 5
        }
    });

    return (
        <>
            <View style={style.container}>
                <View style={style.topContainer}>
                    <ChevronIcon onPress={onToggleExpand} style={style.icon} />
                    <View style={style.title} >
                        <CustomText>{item.label}</CustomText>
                        <CustomText>{item.date}</CustomText>
                        <View style={style.actions}>
                            <TrashIcon onPress={onDelete} />
                            <UseIcon onPress={onUse} colour={appState.isDarkMode ? "#04E2C7" : "#149890"} />
                        </View>
                    </View>
                </View>
                {isExpanded && (
                    <View>
                        <View style={style.flexCenterContainer}>
                            <CustomText>Amount</CustomText>
                            <CustomText>{item.currency} {item.amount} / {item.frequency.label}</CustomText>
                        </View>
                        {item.superannuation && (
                            <View style={style.flexCenterContainer}>
                                <CustomText>Superannuation</CustomText>
                                <CustomText>{item.superannuation}%</CustomText>
                            </View>
                        )}
                        {(item.studentLoanRate || item.studentLoanThreshold) && (
                            <View>
                                <CustomText>Student Loan:</CustomText>
                                <View style={style.studentLoanContainer}>
                                    <View style={style.flexCenterContainer}>
                                        <CustomText>Rate:</CustomText>
                                        <CustomText>{item.studentLoanRate}%</CustomText>
                                    </View>
                                    <View style={style.flexCenterContainer}>
                                        <CustomText>Threshold:</CustomText>
                                        <CustomText>{item.studentLoanThreshold}%</CustomText>
                                    </View>
                                </View>
                            </View>
                        )}
                        {item.secondaryIncome && (
                            <View style={style.flexCenterContainer}>
                                <CustomText>Secondary Income</CustomText>
                                <CustomText>{item.currency} {item.secondaryIncome} / Year</CustomText>
                            </View>
                        )}
                    </View>
                )}

            </View>
            <View style={style.divider} />
        </>

    )
}

export default HistoryItem;