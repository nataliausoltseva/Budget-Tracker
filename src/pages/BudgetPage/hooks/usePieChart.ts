import { useMemo } from "react";
import { ExpenseItem, FREQUENCES } from "../BudgetPage"

type Props = {
    expenses: ExpenseItem[]
}

const usePieChart = ({ expenses }: Props) => {
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

    const getPieData = (frequency: number) => {
        const data: ExpenseItem[] = [];
        yearlyExpenses.forEach((item: ExpenseItem) => {
            data.push({
                ...item,
                value: item.value / frequency
            });
        });

        return data.concat(oneOffExpenses)
    }


    return {
        yearlyExpenses,
        oneOffExpenses,
        getPieData
    }

}

export default usePieChart;