
type Props = {
    item: InvestmentItem,
}

const useTable = ({ item }: Props) => {
    const getReturns = (prevInvestment: number = 0) => {
        const termRate = item.termPeriod.name === "month" ? item.term / 12 * item.rate : item.rate;
        const returnAmount = (item.amount + prevInvestment) * termRate / 100;
        const taxToPay = returnAmount * item.taxRate / 100;
        return Math.round((returnAmount - taxToPay) * 100) / 100;
    }

    const populateData = () => {
        const data: any[] = [];
        const length = (item.termPeriod.name === "month" ? 1 : item.term);
        let previousReturn = 0;
        for (let i = 0; i <= length; i++) {
            const returns = i === 0 ? 0 : getReturns(previousReturn);
            previousReturn += returns;
            data.push([
                i.toString(),
                `$${item.amount}`,
                previousReturn === 0 ? "-" : `$${previousReturn}`,
                `$${Math.round((item.amount + previousReturn) * 100) / 100}`,
            ])
        }
        return data;
    }

    return { data: populateData() }
}

export default useTable;