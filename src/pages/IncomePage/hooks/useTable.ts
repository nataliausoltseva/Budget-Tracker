import { useState } from "react";
import { incomePeriods } from "../../../constants";

type PopulateRowsProps = {
    yearGrossPay: number,
    yearPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number
};

export type RowIndicator = {
    label: string,
    key: string,
    values: number[]
};

export const HEADERS = ["", "Hour", "Week", "Fortnight", "Month", "Year"];

export const DEFAULT_ROWS: RowIndicator[] = [
    {
        label: "Gross",
        key: 'gross',
        values: []
    },
    {
        label: "PAYE",
        key: 'paye',
        values: []
    },
    {
        label: "AСС",
        key: 'acc',
        values: []
    },
    {
        label: "Saver",
        key: 'kiwiSaver',
        values: []
    },
    {
        label: "Stu. Loan",
        key: 'studentLoan',
        values: []
    },
    {
        label: "NET",
        key: 'takeHome',
        values: []
    }
];

const useTable = () => {
    const [rows, setRows] = useState<RowIndicator[]>(DEFAULT_ROWS)
    const roundToTwoDecimals = (value: number) => (
        Math.round((value + Number.EPSILON) * 100) / 100
    )

    const calculateValues = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan }: PopulateRowsProps) => {
        if (yearGrossPay > 0) {
            let grossPay = 0;
            let paye = 0;
            let acc = 0;
            let kiwiSaver = 0;
            let studentLoan = 0;
            incomePeriods.filter((period: IncomePeriod) => period.value !== 'auto').forEach((period: IncomePeriod, index: number) => {
                switch (period.value) {
                    case "hour":
                        grossPay = roundToTwoDecimals(yearGrossPay / 40 / 52);
                        paye = roundToTwoDecimals(yearPaye / 40 / 52);
                        acc = roundToTwoDecimals(yearAcc / 40 / 52);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 40 / 52);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 40 / 52);
                        break;
                    case "week":
                        grossPay = roundToTwoDecimals(yearGrossPay / 52);
                        paye = roundToTwoDecimals(yearPaye / 52);
                        acc = roundToTwoDecimals(yearAcc / 52);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 52);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 52);
                        break;
                    case "fortnight":
                        grossPay = roundToTwoDecimals(yearGrossPay / 26);
                        paye = roundToTwoDecimals(yearPaye / 26);
                        acc = roundToTwoDecimals(yearAcc / 26);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 26);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 26);
                        break;
                    case "month":
                        grossPay = roundToTwoDecimals(yearGrossPay / 12);
                        paye = roundToTwoDecimals(yearPaye / 12);
                        acc = roundToTwoDecimals(yearAcc / 12);
                        kiwiSaver = yearKiwiSaver === 0 ? 0 : roundToTwoDecimals(yearKiwiSaver / 12);
                        studentLoan = yearStudentLoan === 0 ? 0 : roundToTwoDecimals(yearStudentLoan / 12);
                        break;
                    default:
                        grossPay = yearGrossPay;
                        paye = yearPaye;
                        acc = yearAcc;
                        kiwiSaver = yearKiwiSaver;
                        yearStudentLoan = yearStudentLoan;
                        break;
                }
                if (index === 0) {
                    rows[0].values = [];
                    rows[1].values = [];
                    rows[2].values = [];
                    rows[3].values = [];
                    rows[4].values = [];
                    rows[5].values = [];
                }
                rows[0].values.push(grossPay);
                rows[1].values.push(paye);
                rows[2].values.push(acc);
                rows[3].values.push(kiwiSaver);
                rows[4].values.push(studentLoan);
                rows[5].values.push(roundToTwoDecimals(grossPay - paye - acc - kiwiSaver - studentLoan))
            });
        }
        return rows;
    }

    const populateTableRows = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan }: PopulateRowsProps) => {
        setRows(calculateValues({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan }));
    }

    return {
        populateTableRows,
        rows,
    }
}

export default useTable;