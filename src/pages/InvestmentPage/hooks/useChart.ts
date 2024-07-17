import { useContext } from "react";
import { stackDataItem } from "react-native-gifted-charts";
import { AppContext } from "../../../context/AppContext";

type Props = {
    item: InvestmentItem
}

const useChart = ({ item }: Props) => {
    const appState = useContext(AppContext);
    const getTotalInvestment = (prevInvestment: number = 0) => {
        const returnAmount = (item.amount + prevInvestment) * item.rate / 100;
        const taxToPay = returnAmount * item.taxRate / 100;
        return returnAmount - taxToPay;
    }

    const getEndDateMonthly = () => {
        const dueDate = new Date(item.startDate);
        dueDate.setMonth(dueDate.getMonth() + item.term);
        return dueDate.toLocaleDateString();
    }

    const getNextLabel = (prevYear: Date) => {
        const dueDate = new Date(prevYear || item.startDate);
        dueDate.setFullYear(dueDate.getFullYear() + 1);
        return dueDate;
    }

    const initialAmountColour = appState.isDarkMode ? "#A78DFF" : "#01B0E6";
    const returnsAmountColour = appState.isDarkMode ? "#5A9AEF" : "#CD8BFF";

    const prepareData = () => {
        const startDate = new Date(item.startDate);
        let data: stackDataItem[] = [
            {
                stacks: [
                    { value: item.amount, color: initialAmountColour },
                ],
                label: item.termPeriod.name === "month" ? startDate.toLocaleDateString() : startDate.getFullYear().toString()
            },
        ];
        if (item.termPeriod.name === "month") {
            data.push({
                stacks: [
                    { value: item.amount, color: initialAmountColour },
                    { value: getTotalInvestment(), color: returnsAmountColour }
                ],
                label: getEndDateMonthly()
            })
        } else {
            let returns = 0;
            let previousDate = item.startDate
            for (let year = 1; year <= item.term; year++) {
                returns += getTotalInvestment(returns);
                const newDate = getNextLabel(previousDate)
                data.push({
                    stacks: [
                        { value: item.amount, color: initialAmountColour },
                        { value: returns, color: returnsAmountColour }
                    ],
                    label: newDate.getFullYear().toString()
                });

                previousDate = newDate;
            }
        }

        return data
    }

    const data = prepareData();

    return { data };
};

export default useChart;