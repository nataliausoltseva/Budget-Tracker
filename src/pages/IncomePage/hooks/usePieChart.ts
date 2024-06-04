import { useState } from "react";

type PopulateDataType = {
    yearPaye: number,
    yearSecPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number,
    colors: string[],
};

type PieChartItem = {
    value: number,
    color: string,
    text: string,
}

const usePieChart = () => {
    const [data, setData] = useState<PieChartItem[]>([]);

    const populateData = ({
        yearPaye,
        yearAcc,
        yearKiwiSaver,
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
            ...yearKiwiSaver ? [yearKiwiSaver] : [null],
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