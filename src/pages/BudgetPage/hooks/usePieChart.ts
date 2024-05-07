import { useMemo } from "react";
import { ExpenseItem, FREQUENCES } from "../BudgetPage"
import { pieDataItem } from "react-native-gifted-charts";

type Props = {
    expenses: ExpenseItem[],
    totalIncome: number,
    frequency: FrequencyItem,
}

const usePieChart = ({ expenses, totalIncome = 0, frequency = FREQUENCES[0] }: Props) => {
    const calculatedExpenses = useMemo(() => {
        const yearly: ExpenseItem[] = [];
        const oneOff: ExpenseItem[] = [];
        expenses.map((item: ExpenseItem) => {
            if (frequency.key === 'oneOff') {
                oneOff.push(item);
            } else {
                yearly.push({
                    ...item,
                    value: item.value * FREQUENCES[item.frequencyIndex.row].calcToYear
                })
            }
        })
        return { yearly, oneOff }
    }, [expenses]);

    const yearlyExpenses = calculatedExpenses.yearly
    const oneOffExpenses = calculatedExpenses.oneOff

    const pieData = useMemo(() => {
        const data: ExpenseItem[] = [];
        yearlyExpenses.forEach((item: ExpenseItem) => {
            data.push({
                ...item,
                value: item.value / frequency.calcToYear
            });
        });
        return data.concat(oneOffExpenses)
    }, [frequency, expenses]);

    const leftOver = useMemo(() => {
        let income = totalIncome / frequency.calcToYear;
        [...yearlyExpenses, ...oneOffExpenses].forEach((item: ExpenseItem) => {
            income -= (item.value / frequency.calcToYear);
        });
        return income;
    }, [frequency, expenses, totalIncome]);

    return {
        pieData,
        leftOver
    }

}

export default usePieChart;