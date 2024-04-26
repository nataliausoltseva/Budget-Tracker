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

const useIncome = () => {
    const [hasKiwiSaver, setHasKiwiSaver] = useState(false);
    const [hasStudentLoan, setHasStudentLoan] = useState(false);
    const [hasSecondaryIncome, setHasSecondaryIncome] = useState(false);

    const [primaryIncome, setPrimaryIncome] = useState(0);
    const [incomePeriod, setIncomePeriod] = useState(incomePeriods[0]);
    const isIncomePeriodAuto = useRef(true)

    const [kiwiSaverOption, setKiwiSaverOption] = useState(3);
    const [isKiwiSaverCustom, setIsKiwiSaverCustom] = useState(false);

    const [loanRate, setLoanRate] = useState(12)
    const [loanThreshold, setLoanThreshold] = useState(24128);
    const [secondaryIncome, setSecondaryIncome] = useState(0);

    const [yearGrossPay, setYearlyGrossPay] = useState(0);
    const [yearPaye, setYearPaye] = useState(0);

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
        let leftToCalculate = income;
        let paidTax = 0;
        // NOT WORKING CORRECTLY
        TAX_THRESHOLDS.forEach((threshold: TaxThreshold) => {
            if (previousMax >= threshold.min && leftToCalculate > 0) {
                const amountToTax = Math.max(income - threshold.max, 0);
                const taxToPay = amountToTax > 0 ? amountToTax * threshold.rate / 100 : 0;
                paidTax += taxToPay;
                leftToCalculate = Math.max(leftToCalculate - amountToTax, 0);
                previousMax = threshold.max + 1;
            }
        });
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
        console.log('Year income', newIncome)
        setYearlyGrossPay(newIncome);
        calculateYearlyPaye(newIncome);
    }

    return {
        primaryIncome,
        incomePeriod,
        hasKiwiSaver,
        hasStudentLoan,
        hasSecondaryIncome,
        kiwiSaverOption,
        loanRate,
        loanThreshold,
        secondaryIncome,
        isKiwiSaverCustom,
        yearGrossPay,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        setHasKiwiSaver,
        setHasStudentLoan,
        setHasSecondaryIncome,
        setKiwiSaverOption,
        setLoanRate,
        setLoanThreshold,
        setSecondaryIncome,
        setIsKiwiSaverCustom,
    }
}

export default useIncome;
