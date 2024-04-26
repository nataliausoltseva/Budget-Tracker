import { useEffect, useRef, useState } from "react";
import { incomePeriods } from "../../../constants";

export const TAX_THRESHOLDS: TaxThreshold[] = [
    {
        min: 0,
        max: 14000,
        rate: 10.5
    },
    {
        min: 14001,
        max: 48000,
        rate: 17.5,
    },
    {
        min: 48001,
        max: 70000,
        rate: 30,
    },
    {
        min: 70001,
        max: 180000,
        rate: 33,
    },
    {
        min: 180001,
        max: Infinity,
        rate: 39
    }
];

export const ACC = {
    levy: 1.60,
    incomeCap: 142283,
    minIncome: 44250
}

const useIncome = () => {
    const [hasKiwiSaver, setHasKiwiSaver] = useState(false);
    const [hasStudentLoan, setHasStudentLoan] = useState(false);
    const [hasSecondaryIncome, setHasSecondaryIncome] = useState(false);

    const [primaryIncome, setPrimaryIncome] = useState(0);
    const [incomePeriod, setIncomePeriod] = useState(incomePeriods[0]);
    const isIncomePeriodAuto = useRef(true)

    const [kiwiSaverOption, setKiwiSaverOption] = useState(3);
    const [isKiwiSaverCustom, setIsKiwiSaverCustom] = useState(false);

    const [studentLoanRate, setStudentLoanRate] = useState(12)
    const [studentLoanThreshold, setStudentLoanThreshold] = useState(24128);
    const [secondaryIncome, setSecondaryIncome] = useState(0);

    const [yearGrossPay, setYearlyGrossPay] = useState(0);
    const [yearPaye, setYearPaye] = useState(0);
    const [yearAcc, setYearAcc] = useState(0);
    const [yearKiwiSaver, setYearKiwiSaver] = useState(0);
    const [yearStudentLoan, setYearStudentLoan] = useState(0);

    const onPrimaryIncomeChange = (income: number) => {
        setPrimaryIncome(income);

        let period = incomePeriod;
        // period is set to auto
        if (isIncomePeriodAuto.current) {
            period = calculatePeriod(income);
            setIncomePeriod(period);
        }

        calculateYearGrossPay(income, period.value);
    }

    const onIncomePeriodChange = (period: IncomePeriod) => {
        setIncomePeriod(period);
        isIncomePeriodAuto.current = period.value === 'auto';

        if (primaryIncome !== 0) {
            calculateYearGrossPay(primaryIncome, period.value);
        }
    }

    const calculateYearKiwiSaver = (income: number, rate: number) => {
        setYearKiwiSaver(income * rate / 100);
    }

    const onKiwiSaverChange = (rate: number) => {
        setKiwiSaverOption(rate);
        calculateYearKiwiSaver(primaryIncome, rate);
    }

    const calculateYearStudentLoan = (rate: number, threshold: number, income: number) => {
        if (income >= threshold) {
            setYearStudentLoan(income * rate / 100);
        }
    }

    const onStudentLoanChange = (rate: number | null, threshold: number | null) => {
        if (rate !== null) {
            setStudentLoanRate(rate);
        }

        if (threshold !== null) {
            setStudentLoanThreshold(threshold);
        }

        calculateYearStudentLoan(rate || studentLoanRate, threshold || studentLoanThreshold, yearGrossPay);
    }

    const calculatePeriod = (income: number) => {
        switch (true) {
            case income === 0:
                return incomePeriods[0];
            case income > 0 && income <= 249:
                return incomePeriods[1];
            case income >= 250 && income <= 5000:
                return incomePeriods[2];
            case income > 5001:
                return incomePeriods[5]
            default:
                return incomePeriods[0];
        }
    }

    const calculateYearlyPaye = (income: number) => {
        let previousMax = 0;
        let isDone = false;
        let paidTax = 0;
        TAX_THRESHOLDS.forEach((threshold: TaxThreshold) => {
            if (!isDone) {
                const amountToTax = previousMax === 0 ?
                    threshold.max :
                    (income > threshold.max ? threshold.max - threshold.min : income - threshold.min);
                const taxToPay = amountToTax * threshold.rate / 100;
                paidTax += taxToPay;
                previousMax = threshold.max;
                isDone = income < threshold.max;
            }
        });
        setYearPaye(paidTax);
    }

    const calculcateYearAcc = (income: number) => {
        setYearAcc(Math.max(Math.min(ACC.minIncome), ACC.incomeCap) / 100 * ACC.levy);
    }

    const calculateYearGrossPay = (income: number, periodValue: string) => {
        let newIncome = income;
        switch (periodValue) {
            case "hour":
                newIncome = newIncome * 40 * 52;
                break;
            case "week":
                newIncome = newIncome * 52;
                break;
            case "fortnight":
                newIncome = newIncome * 26;
                break;
            case "month":
                newIncome = newIncome * 12;
                break;
            default:
                newIncome = income;
                break;
        }
        setYearlyGrossPay(newIncome);
        calculateYearlyPaye(newIncome);
        calculcateYearAcc(newIncome);
        calculateYearKiwiSaver(newIncome, kiwiSaverOption);
        calculateYearStudentLoan(studentLoanRate, studentLoanThreshold, newIncome);
    }

    return {
        primaryIncome,
        incomePeriod,
        hasKiwiSaver,
        hasStudentLoan,
        hasSecondaryIncome,
        kiwiSaverOption,
        studentLoanRate,
        studentLoanThreshold,
        secondaryIncome,
        isKiwiSaverCustom,
        yearGrossPay,
        yearPaye,
        yearAcc,
        yearKiwiSaver,
        yearStudentLoan,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onKiwiSaverChange,
        onStudentLoanChange,
        setHasKiwiSaver,
        setHasStudentLoan,
        setHasSecondaryIncome,
        setKiwiSaverOption,
        setSecondaryIncome,
        setIsKiwiSaverCustom,
    }
}

export default useIncome;
