import { Button, ScrollView, StyleSheet, View } from "react-native"
import { memo, useContext, useEffect, useState } from "react"
import InvestmentItem from "./components/InvestmentItem"
import InvestmentModal from "./components/InvestmentModal"
import CustomText from "../../components/CustomText"
import { AppContext } from "../../context/AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
            onSaveData(newInvestment);
            return newInvestments;
        });
        setRandom(Math.random());
    }

    const onItemChange = (item: InvestmentItem, index: number) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments[index] = item;
            return newInvestments;
        });
    }

    const onItemDelete = (index: number) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments.splice(index, 1);
            return newInvestments;
        });
    }

    const onSaveData = async (newInvesment: InvestmentItem) => {
        const currentData = await AsyncStorage.getItem('investmentData');
        const listData = currentData === null ? [] : JSON.parse(currentData);
        listData.push(newInvesment);
        await AsyncStorage.setItem('investmentData', JSON.stringify(listData));
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

    return (
        <View style={{ display: isHidden ? "none" : "flex", flexGrow: 1 }}>
            {investments.length ? (
                <ScrollView style={containerStyles(isHidden).container}>
                    {investments.map((item: InvestmentItem, index: number) => (
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
