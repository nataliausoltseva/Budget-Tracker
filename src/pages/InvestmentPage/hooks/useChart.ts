
type Props = {
    item: InvestmentItem
}

const useChart = ({ item }: Props) => {

    // TODO need to test with some real data
    const getTotalInvestment = () => {
        const returnAmount = item.amount * item.rate / 100;
        const taxToPay = returnAmount * item.taxRate / 100;
        return returnAmount - taxToPay;
    }

    const getEndDateMonthly = () => {
        const dueDate = item.startDate;
        dueDate.setMonth(dueDate.getMonth() + item.term);
        return dueDate.toLocaleDateString();
    }

    const prepareData = () => {
        let data: any[] = [];
        if (item.termPeriod.name === "month") {
            data = [
                {
                    stacks: [
                        { value: item.amount, color: "blue" },
                    ],
                    label: item.startDate.toLocaleDateString()
                },
                {
                    stacks: [
                        { value: item.amount, color: "blue" },
                        { value: getTotalInvestment(), color: "orange" }
                    ],
                    label: getEndDateMonthly()
                }
            ];
        }
        return data
    }

    const data = prepareData();

    return { data };
};

export default useChart;