import { incomePeriods } from "../../../constants";

type Props = {
    yearGrossPay: number,
    yearPaye: number,
    yearAcc: number,
    yearKiwiSaver: number,
    yearStudentLoan: number
};

type RowIndicator = {
    label: string,
    key: string,
    values: number[]
};

export const HEADERS = ["", "Hour", "Week", "Fortnight", "Month", "Year"];

const useTable = ({ yearGrossPay, yearPaye, yearAcc, yearKiwiSaver, yearStudentLoan }: Props) => {

    const getGrossPay = () => {
        const values: number[] = [];
        if (yearGrossPay > 0) {
            incomePeriods.forEach((period: IncomePeriod) => {
                switch (period.value) {
                    case "hour":
                        values.push(yearGrossPay / 40 / 52);
                        break;
                    case "week":
                        values.push(yearGrossPay / 52);
                        break;
                    case "fortnightly":
                        values.push(yearGrossPay / 26);
                        break;
                    case "monthly":
                        values.push(yearGrossPay / 12);
                        break;
                    default:
                        values.push(yearGrossPay);
                        break;
                }
            });
        }

        return values;
    }

    const calculateValues = (rows: RowIndicator[]) => {
        if (yearGrossPay > 0) {
            incomePeriods.forEach((period: IncomePeriod) => {
                switch (period.value) {
                    case "hour":
                        rows[0].values.push(yearGrossPay / 40 / 52);
                        rows[1].values.push(yearPaye / 40 / 52);
                        rows[2].values.push(yearAcc / 40 / 52);
                        rows[3].values.push(yearKiwiSaver / 40 / 52);
                        rows[4].values.push(yearStudentLoan / 40 / 52);
                        break;
                    case "week":
                        rows[0].values.push(yearGrossPay / 52);
                        rows[1].values.push(yearPaye / 52);
                        rows[2].values.push(yearAcc / 52);
                        rows[3].values.push(yearKiwiSaver / 52);
                        rows[4].values.push(yearStudentLoan / 52);
                        break;
                    case "fortnight":
                        rows[0].values.push(yearGrossPay / 26);
                        rows[1].values.push(yearPaye / 26);
                        rows[2].values.push(yearAcc / 26);
                        rows[3].values.push(yearKiwiSaver / 26);
                        rows[4].values.push(yearStudentLoan / 26);
                        break;
                    case "month":
                        rows[0].values.push(yearGrossPay / 12);
                        rows[1].values.push(yearPaye / 12);
                        rows[2].values.push(yearAcc / 12);
                        rows[3].values.push(yearKiwiSaver / 12);
                        rows[4].values.push(yearStudentLoan / 12); break;
                    default:
                        rows[0].values.push(yearGrossPay);
                        rows[1].values.push(yearPaye);
                        rows[2].values.push(yearAcc);
                        rows[3].values.push(yearKiwiSaver);
                        rows[4].values.push(yearStudentLoan);
                        break;
                }
            });
        }

        return rows;
    }


    const onCalculate = () => {
        let rowIndicators: RowIndicator[] = [
            {
                label: "Gross Pay",
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
                label: "KiwiSaver",
                key: 'kiwiSaver',
                values: []
            },
            {
                label: "Student Loan",
                key: 'studentLoan',
                values: []
            },
            {
                label: "Take Home Pay",
                key: 'takeHome',
                values: []
            }
        ];

        rowIndicators = calculateValues(rowIndicators);
        console.log(rowIndicators);
    }

    return {
        onCalculate,
    }
}

export default useTable;