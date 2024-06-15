import { useState } from "react";

type PopulateRowsProps = {
    yearGrossPay: number,
    yearSecGrossPay: number,
    yearPaye: number,
    yearSecPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number
};

export const HEADERS = [
    {
        label: "",
        calcToYear: 0,
    },
    {
        label: "Hour",
        calcToYear: (40 * 52)
    },
    {
        label: "Week",
        calcToYear: 52
    },
    {
        label: "Fortnight",
    },
    {
        label: "Month",
        calcToYear: 12
    },
    {
        label: "Year",
        calcToYear: 1,
    }
];

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

const useTable = ({ selectedHeader }: { selectedHeader: Record<string, number> }) => {
    const [rows, setRows] = useState<RowIndicator[]>(DEFAULT_ROWS);
    const [isSimpleTable, setIsSimpleTable] = useState(false);

    const roundToTwoDecimals = (value: number) => (
        Math.round(value * 100) / 100
    );

    const calculateValues = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye }: PopulateRowsProps) => {
        let newRows: RowIndicator[] = [...rows];
        if (yearGrossPay > 0) {
            newRows = DEFAULT_ROWS;
            const grossPay = roundToTwoDecimals(yearGrossPay / selectedHeader.calcToYear);
            const secGrossPay = roundToTwoDecimals(yearSecGrossPay / selectedHeader.calcToYear);
            const paye = roundToTwoDecimals(yearPaye / selectedHeader.calcToYear);
            const secPaye = roundToTwoDecimals(yearSecPaye / selectedHeader.calcToYear);
            const acc = roundToTwoDecimals(yearAcc / selectedHeader.calcToYear);
            const kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / selectedHeader.calcToYear);
            const studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / selectedHeader.calcToYear);

            newRows[0].values.push(grossPay);
            newRows[1].values.push(secGrossPay);
            newRows[2].values.push(paye);
            newRows[3].values.push(secPaye);
            newRows[4].values.push(acc);
            newRows[5].values.push(kiwiSaver);
            newRows[6].values.push(studentLoan);
            newRows[7].values.push(roundToTwoDecimals(grossPay + secGrossPay - paye - acc - kiwiSaver - studentLoan - secPaye));
        }
        newRows[1].isHidden = yearSecGrossPay === 0;
        newRows[3].isHidden = yearSecGrossPay === 0;
        newRows[5].isHidden = yearKiwiSaver === 0;
        newRows[6].isHidden = yearStudentLoan === 0;

        return newRows;
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