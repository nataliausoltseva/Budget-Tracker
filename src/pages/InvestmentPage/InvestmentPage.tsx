import { Button, ScrollView, StyleSheet, View } from "react-native"
import { memo, useState } from "react"
import InvestmentItem from "./components/InvestmentItem"
import InvestmentModal from "./components/InvestmentModal"
import CustomText from "../../components/CustomText"

type Props = {
    isHidden: boolean
}

const InvestmentPage = ({ isHidden = false }: Props) => {
    const [random, setRandom] = useState(Math.random());
    const [investments, setInvestments] = useState<InvestmentItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onSave = (newInvestment: InvestmentItem) => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments.push(newInvestment);
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

    return (
        <ScrollView style={containerStyles(isHidden).container}>
            <View style={styles.buttonContainer}>
                <Button title="Add" onPress={() => setIsModalVisible(true)} />
            </View>
            {!!investments.length && (
                <CustomText>Your investments:</CustomText>
            )}
            {investments.map((item: InvestmentItem, index: number) => (
                <InvestmentItem
                    key={`i-${index}-${random}`}
                    item={item}
                    onItemChange={(investment: InvestmentItem) => onItemChange(investment, index)}
                    onDelete={() => onItemDelete(index)}
                />
            ))}
            {isModalVisible && (
                <InvestmentModal
                    onSave={onSave}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </ScrollView>
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
