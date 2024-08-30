import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import CustomText from "../../../components/CustomText";
import ChevronIcon from "../../../components/ChevronIcon";
import { AppContext } from "../../../context/AppContext";
import TrashIcon from "../../../components/TrashIcon";
import UseIcon from "../../../components/UseIcon";

type Props = {
    item: BudgetHistoryItem,
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
        topWrapper: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: "space-between",
            marginLeft: 10
        },
        actions: {
            flexDirection: 'row'
        },
        expense: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between"
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
                    <View style={style.topWrapper} >
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
                        {item.expenses.map((expense, index) => (
                            <View key={index} style={style.expense}>
                                <CustomText>{expense.name}</CustomText>
                                <CustomText>{expense.value} / {expense.frequency.name}</CustomText>
                            </View>
                        ))}
                    </View>
                )}

            </View>
            <View style={style.divider} />
        </>

    )
}

export default HistoryItem;