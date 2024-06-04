import { useState } from "react";
import { randomHex } from "../../../hooks/color";
import { PieChartPropsType } from "react-native-gifted-charts";

type PopulateDataType = {
    yearGrossPay: number,
    yearSecGrossPay: number,
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
}

const usePieChart = () => {
    const [data, setData] = useState<PieChartItem[]>([]);

    const populateData = ({
        yearGrossPay,
        yearSecGrossPay,
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
            ...yearSecPaye ? [yearSecPaye] : [],
            yearAcc,
            ...yearKiwiSaver ? [yearKiwiSaver] : [],
            ...yearStudentLoan ? [yearStudentLoan] : [],
        ];

        const newData: PieChartItem[] = [];

        values.forEach((value, index) => {
            if (value !== null) {
                newData.push({
                    value,
                    color: colors[index]
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