import { useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import { FREQUENCES } from "../../../constants";

type Props = {
    expenses: ExpenseItem[],
    frequency: FrequencyItem,
}

const usePieChart = ({ expenses, frequency = FREQUENCES[0] }: Props) => {
    const appState = useContext(AppContext);

    const totalIncome = appState?.totalIncome || 0;

    const calculatedExpenses = useMemo(() => {
        const yearly: ExpenseItem[] = [];
        const oneOff: ExpenseItem[] = [];
        expenses.map((item: ExpenseItem) => {
            if (item.frequency.key === 'oneOff') {
                oneOff.push(item);
            } else {
                yearly.push({
                    ...item,
                    value: item.value * item.frequency.calcToYear
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
        const leftOver = income - yearExpensesSum - oneOffExpensesSum;
        return Math.round(leftOver * 100) / 100;
    }, [frequency, expenses, totalIncome]);

    return {
        pieData,
        leftOver
    }
}

export default usePieChart;