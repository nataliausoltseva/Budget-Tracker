import { ScrollView, StyleSheet } from "react-native"
import InvestmentItem from "./components/InvestmentItem"
import { useState } from "react"
import { Button } from "@ui-kitten/components"

type Props = {
    isHidden: boolean
}

const InvestmentPage = ({ isHidden = false }: Props) => {
    const [newInvestment, setNewInvestment] = useState<InvestmentItem>({
        name: '',
        amount: 0,
        rate: 0,
        term: 0.583,
        taxRate: 0,
        startDate: new Date()
    });

    const [investments, setInvestments] = useState<InvestmentItem[]>([]);

    const onSave = () => {
        setInvestments((prevState: InvestmentItem[]) => {
            const newInvestments = [...prevState];
            newInvestments.push(newInvestment);
            return newInvestments;
        });
    }

    console.log(newInvestment);

    return (
        <ScrollView style={containerStyles(isHidden).container}>
            <InvestmentItem
                item={newInvestment}
                onItemChange={setNewInvestment}
            />
            <Button onPress={onSave} disabled={!newInvestment.name || !newInvestment.amount || newInvestment.amount === 0}>Add</Button>

        </ScrollView>
    )
}

export default InvestmentPage;

const containerStyles = (isHidden: boolean) => StyleSheet.create({
    container: {
        display: isHidden ? "none" : "flex",
    },
});
