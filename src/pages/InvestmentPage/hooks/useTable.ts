
type Props = {
    item: InvestmentItem,
}

const useTable = ({ item }: Props) => {
    const getReturns = (prevInvestment: number = 0) => {
        const returnAmount = (item.amount + prevInvestment) * item.rate / 100;
        const taxToPay = returnAmount * item.taxRate / 100;
        return returnAmount - taxToPay;
    }

    const populateData = () => {
        const data: any[] = [];
        const length = (item.termPeriod.name === "month" ? 1 : item.term) + 1;
        let previousReturn = 0;
        for (let i = 0; i <= length; i++) {
            const returns = i === 0 ? 0 : getReturns(previousReturn);
            data.push([
                i.toString(),
                `$${item.amount}`,
                returns === 0 ? "-" : `$${returns}`,
                `$${item.amount + returns}`,
            ])
            previousReturn += returns;
        }
        return data;
    }
    console.log(populateData())
    return { data: populateData() }
}

export default useTable;