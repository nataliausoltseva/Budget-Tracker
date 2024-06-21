import { useState } from "react";

type PopulateRowsProps = {
    yearGrossPay: number,
    yearSecGrossPay: number,
    yearPaye: number,
    yearSecPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number,
    tableHeader: IncomeTableHeader
};

export const HEADERS: IncomeTableHeader[] = [
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
        calcToYear: 26,
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
        value: 0,
        isHidden: false,
        isSimple: true,
        hideWhenEmpty: false,
    },
    {
        label: "Sec Gross",
        key: 'secGross',
        value: 0,
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "PAYE",
        key: 'paye',
        value: 0,
        isHidden: false,
        isSimple: false,
        hideWhenEmpty: false,
    },
    {
        label: "Sec PAYE",
        key: 'secPaye',
        value: 0,
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "AСС",
        key: 'acc',
        value: 0,
        isHidden: false,
        isSimple: false,
        hideWhenEmpty: false,
    },
    {
        label: "Saver",
        key: 'kiwiSaver',
        value: 0,
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "Stu. Loan",
        key: 'studentLoan',
        value: 0,
        isHidden: true,
        isSimple: false,
        hideWhenEmpty: true,
    },
    {
        label: "NET",
        key: 'takeHome',
        value: 0,
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

    const calculateValues = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye, tableHeader }: PopulateRowsProps) => {
        let newRows: RowIndicator[] = [...rows];
        if (yearGrossPay > 0) {
            newRows = DEFAULT_ROWS;
            const grossPay = roundToTwoDecimals(yearGrossPay / tableHeader.calcToYear);
            const secGrossPay = roundToTwoDecimals(yearSecGrossPay / tableHeader.calcToYear);
            const paye = roundToTwoDecimals(yearPaye / tableHeader.calcToYear);
            const secPaye = roundToTwoDecimals(yearSecPaye / tableHeader.calcToYear);
            const acc = roundToTwoDecimals(yearAcc / tableHeader.calcToYear);
            const kiwiSaver = roundToTwoDecimals(yearKiwiSaver === 0 ? 0 : yearKiwiSaver / tableHeader.calcToYear);
            const studentLoan = roundToTwoDecimals(yearStudentLoan === 0 ? 0 : yearStudentLoan / tableHeader.calcToYear);

            newRows[0].value = grossPay;
            newRows[1].value = secGrossPay;
            newRows[2].value = paye;
            newRows[3].value = secPaye;
            newRows[4].value = acc;
            newRows[5].value = kiwiSaver;
            newRows[6].value = studentLoan;
            newRows[7].value = roundToTwoDecimals(grossPay + secGrossPay - paye - acc - kiwiSaver - studentLoan - secPaye);
        }
        newRows[1].isHidden = yearSecGrossPay === 0;
        newRows[3].isHidden = yearSecGrossPay === 0;
        newRows[5].isHidden = yearKiwiSaver === 0;
        newRows[6].isHidden = yearStudentLoan === 0;

        newRows = hideSimpleRows(newRows);
        return newRows;
    }

    const hideSimpleRows = (newRows: RowIndicator[]) => {
        newRows.forEach((row: RowIndicator) => {
            if (!row.isSimple) {
                // Only hide all other rows if simple toggle is selected OR the rows are empty and should be hidden by default.
                row.isHidden = isSimpleTable || (row.hideWhenEmpty && row.value === 0);
            }
        })
        return newRows;
    }

    const populateTableRows = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye, tableHeader }: PopulateRowsProps) => {
        setRows(calculateValues({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan, yearSecGrossPay, yearSecPaye, tableHeader }));
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