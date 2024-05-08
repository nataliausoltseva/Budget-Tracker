import { useMemo } from "react";
import { ExpenseItem, FREQUENCES } from "../BudgetPage"

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
            if (FREQUENCES[item.frequencyIndex.row].key === 'oneOff') {
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
        const yearExpensesSum = yearlyExpenses.reduce((partialSum, item) => partialSum + (item.value / frequency.calcToYear), 0);
        const oneOffExpensesSum = oneOffExpenses.reduce((partialSum, item) => partialSum + item.value, 0);
        return income - yearExpensesSum - oneOffExpensesSum;
    }, [frequency, expenses, totalIncome]);

    return {
        pieData,
        leftOver
    }

}

export default usePieChart;