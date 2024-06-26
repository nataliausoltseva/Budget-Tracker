import { stackDataItem } from "react-native-gifted-charts";

type Props = {
    item: InvestmentItem
}

const useChart = ({ item }: Props) => {
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

    const prepareData = () => {
        let data: stackDataItem[] = [
            {
                stacks: [
                    { value: item.amount, color: "blue" },
                ],
                label: item.termPeriod.name === "month" ? item.startDate.toLocaleDateString() : item.startDate.getFullYear().toString()
            },
        ];
        if (item.termPeriod.name === "month") {
            data.push({
                stacks: [
                    { value: item.amount, color: "blue" },
                    { value: getTotalInvestment(), color: "orange" }
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
                        { value: item.amount, color: "blue" },
                        { value: returns, color: "orange" }
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