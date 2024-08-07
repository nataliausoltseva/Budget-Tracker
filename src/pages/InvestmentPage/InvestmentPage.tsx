import { Button, ScrollView, StyleSheet, View } from "react-native"
import { memo, useContext, useEffect, useMemo, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import InvestmentItem from "./components/InvestmentItem"
import InvestmentModal from "./components/InvestmentModal"
import CustomText from "../../components/CustomText"
import { AppContext } from "../../context/AppContext"
import { getEndDate } from "../../hooks/date"

type Props = {
    isHidden: boolean
}

const InvestmentPage = ({ isHidden = false }: Props) => {
    const appState = useContext(AppContext);
    const [random, setRandom] = useState(Math.random());
    const [investments, setInvestments] = useState<InvestmentItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const data = await AsyncStorage.getItem('investmentData');
            if (data !== null) {
                setInvestments(JSON.parse(data));
            }
        }

        getData();
    }, []);

    const onSave = (newInvestment: InvestmentItem) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments.push(newInvestment);
            onSaveToStorage(newInvestments);
            return newInvestments;
        });
        setRandom(Math.random());
    }

    const onItemChange = (item: InvestmentItem, index: number) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments[index] = item;
            onSaveToStorage(newInvestments);
            return newInvestments;
        });
    }

    const onItemDelete = (index: number) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments.splice(index, 1);
            onSaveToStorage(newInvestments);
            return newInvestments;
        });
    }

    const onSaveToStorage = async (newInvestments?: InvestmentItem[]) => {
        await AsyncStorage.setItem('investmentData', JSON.stringify(newInvestments || investments));
    }

    const renderButton = () => {
        return (
            <View style={{ width: 50 }}>
                <Button
                    title={"Add"}
                    onPress={() => setIsModalVisible(true)}
                    color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                />
            </View>
        )
    }

    const sortedInvestments = useMemo(() => (
        investments.sort((a, b) => {
            const aEndDate = getEndDate(new Date(a.startDate), a.term, a.termPeriod.name === 'month');
            const bEndDate = getEndDate(new Date(b.startDate), b.term, b.termPeriod.name === 'month');
            if (aEndDate.getTime() > bEndDate.getTime()) {
                return -1;
            }
            return 1;
        })
    ), [investments]);

    return (
        <View style={{ display: isHidden ? "none" : "flex", flexGrow: 1 }}>
            {investments.length ? (
                <ScrollView style={containerStyles(isHidden).container}>
                    {sortedInvestments.map((item: InvestmentItem, index: number) => (
                        <InvestmentItem
                            key={`i-${index}-${random}`}
                            item={item}
                            onItemChange={(investment: InvestmentItem) => onItemChange(investment, index)}
                            onDelete={() => onItemDelete(index)}
                        />
                    ))}
                    <View style={{ alignItems: "flex-end", marginTop: 20 }}>
                        {renderButton()}
                    </View>
                </ScrollView>
            ) : (
                <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                    <CustomText style={{ marginBottom: 20 }}>Add you first investment</CustomText>
                    {renderButton()}
                </View>
            )}
            {isModalVisible && (
                <InvestmentModal
                    onSave={onSave}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </View>
    )
}

export default memo(InvestmentPage);

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
    },
});

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "flex-end"
    },
    button: {
        width: 100,
    },
});
