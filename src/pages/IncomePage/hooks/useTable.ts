import { incomePeriods } from "../../../constants";

type Props = {
    yearGrossPay: number
}

export const HEADERS = ["", "Hour", "Week", "Fortnight", "Month", "Year"];

const useTable = ({ yearGrossPay }: Props) => {
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

    const calculateYearlyPayer = () => {

    }

    const getPaye = () => {
        const values: number[] = [];
        if (yearGrossPay > 0) {
            const yearlyPaye = calculateYearlyPayer();
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


    const rowIndicators = [
        // {
        //     label: "Gross Pay",
        //     values: getGrossPay()
        // },
        // {
        //     lable: "PAYE",
        //     values: getPaye()
        // },
        // {
        //     label: "AСС",
        //     values: getAcc()
        // },
        // {
        //     label: "KiwiSaver",
        //     values: getKiwiSaver()
        // },
        // {
        //     label: "Student Loan",
        //     values: getStudentLoan()
        // },
        // {
        //     label: "Take Home Pay",
        //     values: getTaeHomePay()
        // }
    ];

    const onCalculate = () => {
        const newRows = [];

    }

    return {
        onCalculate,
    }
}

export default useTable;