import { ScrollView, StyleSheet } from "react-native"
import InvestmentItem from "./components/InvestmentItem"
import { useState } from "react"
import { Button, Text } from "@ui-kitten/components"
import InvestmentModal from "./components/InvestmentModal"

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

    return (
        <ScrollView style={containerStyles(isHidden).container}>
            <Button onPress={() => setIsModalVisible(true)}>Add</Button>
            {!!investments.length && (
                <Text>Your investments:</Text>
            )}
            {investments.map((item: InvestmentItem, index: number) => (
                <InvestmentItem
                    key={`i-${index}-${random}`}
                    item={item}
                    onItemChange={(investment: InvestmentItem) => onItemChange(investment, index)}
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

export default InvestmentPage;

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
    },
});
