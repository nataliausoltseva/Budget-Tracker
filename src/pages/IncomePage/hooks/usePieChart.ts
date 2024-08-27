import { useState } from "react";

type PopulateDataType = {
    yearPaye: number,
    yearSecPaye: number,
    yearAcc: number,
    yearSuperannuation: number,
    yearStudentLoan: number,
    colors: string[],
};

const usePieChart = () => {
    const [data, setData] = useState<PieChartItem[]>([]);

    const populateData = ({
        yearPaye,
        yearAcc,
        yearSuperannuation,
        yearStudentLoan,
        yearSecPaye,
        colors,
    }: PopulateDataType) => {
        const values = [
            null,
            null,
            yearPaye,
            ...yearSecPaye ? [yearSecPaye] : [null],
            yearAcc,
            ...yearSuperannuation ? [yearSuperannuation] : [null],
            ...yearStudentLoan ? [yearStudentLoan] : [null],
        ];

        const newData: PieChartItem[] = [];

        values.forEach((value, index) => {
            if (value !== null) {
                newData.push({
                    value,
                    color: colors[index],
                    text: value.toString()
                })
            }
        })

        setData(newData);
    }

    return {
        pieData: data,
        populateData,
    }
}

export default usePieChart;