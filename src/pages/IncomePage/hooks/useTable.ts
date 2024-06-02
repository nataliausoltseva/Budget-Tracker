import { useState } from "react";
import { incomePeriods } from "../../../constants";

type PopulateRowsProps = {
    yearGrossPay: number,
    yearSecGrossPay: number,
    yearPaye: number,
    yearSecPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number
};

export type RowIndicator = {
    label: string,
    key: string,
    values: number[],
    isHidden: boolean,
    isSimple: boolean,
    hideWhenEmpty: boolean,
};

export const HEADERS = ["", "Hour", "Week", "Fortnight", "Month", "Year"];

export const DEFAULT_ROWS: RowIndicator[] = [
    {
        label: "Gross",
        key: 'gross',
        values: [0, 0, 0, 0, 0],
        isHidden: false,
        isSimple: true,
        hideWhenEmpty: false,
    },
    {
        label: "Sec Gross",
        key: 'secGross',
        values: [0, 0, 0, 0, 0],
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "PAYE",
        key: 'paye',
        values: [0, 0, 0, 0, 0],
        isHidden: false,
        isSimple: false,
        hideWhenEmpty: false,
    },
    {
        label: "Sec PAYE",
        key: 'secPaye',
        values: [0, 0, 0, 0, 0],
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "AСС",
        key: 'acc',
        values: [0, 0, 0, 0, 0],
        isHidden: false,
        isSimple: false,
        hideWhenEmpty: false,
    },
    {
        label: "Saver",
        key: 'kiwiSaver',
        values: [0, 0, 0, 0, 0],
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "Stu. Loan",
        key: 'studentLoan',
        values: [0, 0, 0, 0, 0],
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "NET",
        key: 'takeHome',
        values: [0, 0, 0, 0, 0],
        isHidden: false,
        isSimple: true,
        hideWhenEmpty: false,
    }
];

const useTable = () => {
    const [rows, setRows] = useState<RowIndicator[]>(DEFAULT_ROWS);
    const [isSimpleTable, setIsSimpleTable] = useState(false);

    const roundToTwoDecimals = (value: number) => (
        Math.round(value * 100) / 100
    );

    const calculateValues = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye }: PopulateRowsProps) => {
        if (yearGrossPay > 0) {
            let grossPay = 0;
            let secGrossPay = 0;
            let paye = 0;
            let secPaye = 0;
            let acc = 0;
            let kiwiSaver = 0;
            let studentLoan = 0;
            incomePeriods.filter((period: IncomePeriod) => period.value !== 'auto').forEach((period: IncomePeriod, index: number) => {
                switch (period.value) {
                    case "hour":
                        grossPay = roundToTwoDecimals(yearGrossPay / 40 / 52);
                        secGrossPay = roundToTwoDecimals(yearSecGrossPay / 40 / 52);
                        paye = roundToTwoDecimals(yearPaye / 40 / 52);
                        secPaye = roundToTwoDecimals(yearSecPaye / 40 / 52);
                        acc = roundToTwoDecimals(yearAcc / 40 / 52);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 40 / 52);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 40 / 52);
                        break;
                    case "week":
                        grossPay = roundToTwoDecimals(yearGrossPay / 52);
                        secGrossPay = roundToTwoDecimals(yearSecGrossPay / 52);
                        paye = roundToTwoDecimals(yearPaye / 52);
                        secPaye = roundToTwoDecimals(yearSecPaye / 52);
                        acc = roundToTwoDecimals(yearAcc / 52);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 52);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 52);
                        break;
                    case "fortnight":
                        grossPay = roundToTwoDecimals(yearGrossPay / 26);
                        secGrossPay = roundToTwoDecimals(yearSecGrossPay / 26);
                        paye = roundToTwoDecimals(yearPaye / 26);
                        secPaye = roundToTwoDecimals(yearSecPaye / 26);
                        acc = roundToTwoDecimals(yearAcc / 26);
                        kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / 26);
                        studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / 26);
                        break;
                    case "month":
                        grossPay = roundToTwoDecimals(yearGrossPay / 12);
                        secGrossPay = roundToTwoDecimals(yearSecGrossPay / 12);
                        paye = roundToTwoDecimals(yearPaye / 12);
                        secPaye = roundToTwoDecimals(yearSecPaye / 12);
                        acc = roundToTwoDecimals(yearAcc / 12);
                        kiwiSaver = yearKiwiSaver === 0 ? 0 : roundToTwoDecimals(yearKiwiSaver / 12);
                        studentLoan = yearStudentLoan === 0 ? 0 : roundToTwoDecimals(yearStudentLoan / 12);
                        break;
                    default:
                        grossPay = yearGrossPay;
                        secGrossPay = yearSecGrossPay;
                        paye = yearPaye;
                        secPaye = yearSecPaye;
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
                    rows[6].values = [];
                    rows[7].values = [];
                }
                rows[0].values.push(grossPay);
                rows[1].values.push(secGrossPay);
                rows[2].values.push(paye);
                rows[3].values.push(secPaye);
                rows[4].values.push(acc);
                rows[5].values.push(kiwiSaver);
                rows[6].values.push(studentLoan);
                rows[7].values.push(roundToTwoDecimals(grossPay + secGrossPay - paye - acc - kiwiSaver - studentLoan - secPaye));
            });
        }
        rows[1].isHidden = yearSecGrossPay === 0;
        rows[3].isHidden = yearSecGrossPay === 0;
        rows[5].isHidden = yearKiwiSaver === 0;
        rows[6].isHidden = yearStudentLoan === 0;

        return rows;
    }

    const populateTableRows = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye }: PopulateRowsProps) => {
        setRows(calculateValues({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye }));
    }

    return {
        populateTableRows,
        rows,
        setIsSimpleTable,
        isSimpleTable,
        setRows,
    }
}

export default useTable;