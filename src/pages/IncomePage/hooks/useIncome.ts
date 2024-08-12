import { useRef, useState } from "react";
import { incomePeriods } from "../../../constants";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export const TAX_THRESHOLDS: TaxThreshold[] = [
    {
        min: "0",
        max: "15600",
        rate: "10.5"
    },
    {
        min: "15601",
        max: "53500",
        rate: "17.5",
    },
    {
        min: "53501",
        max: "78100",
        rate: "30",
    },
    {
        min: "78101",
        max: "180000",
        rate: "33",
    },
    {
        min: "180001",
        max: "",
        rate: "39"
    }
];

export const COLORS: string[] = ["#f6abb6", "#B2A185", "#6FA5E9", "#7BD5E9", "#B2675F", "#75B35F", "#B26BB1", "#B1A5E9", "#AEB26F"];

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

    const [studentLoanRate, setStudentLoanRate] = useState(12)
    const [studentLoanThreshold, setStudentLoanThreshold] = useState(24128);
    const [secondaryIncome, setSecondaryIncome] = useState(0);

    const [taxThresholds, setTaxThresholds] = useState<TaxThreshold[]>(TAX_THRESHOLDS);

    const onPrimaryIncomeChange = (income: number) => {
        setPrimaryIncome(income);

        let period = incomePeriod;
        // period is set to auto
        if (isIncomePeriodAuto.current) {
            period = calculatePeriod(income);
            setIncomePeriod(period);
        }
    }

    const onIncomePeriodChange = (period: IncomePeriod) => {
        setIncomePeriod(period);
        isIncomePeriodAuto.current = period.value === 'auto';
    }

    const calculateYearKiwiSaver = (yearGrossPay: number) => {
        return yearGrossPay * kiwiSaverOption / 100;
    }

    const onKiwiSaverChange = (rate: number) => {
        setKiwiSaverOption(rate);
    }

    const calculateYearStudentLoan = (yearGrossPay: number) => {
        if (yearGrossPay >= studentLoanThreshold) {
            return yearGrossPay * studentLoanRate / 100;
        }
        return 0;
    }

    const onStudentLoanChange = (rate: number | null, threshold: number | null) => {
        if (rate !== null) {
            setStudentLoanRate(rate);
        }

        if (threshold !== null) {
            setStudentLoanThreshold(threshold);
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

    const calculateYearlyPaye = (yearGrossPay: number) => {
        let previousMax = 0;
        let isDone = false;
        let paidTax = 0;
        taxThresholds.forEach((threshold: TaxThreshold) => {
            const max = threshold.max ? parseFloat(threshold.max) : Infinity;
            const min = parseFloat(threshold.min);
            const rate = parseFloat(threshold.rate);
            if (!isDone) {
                const amountToTax = previousMax === 0 ?
                    max :
                    (yearGrossPay > max ? max - min + 1 : yearGrossPay - min + 1);
                const taxToPay = amountToTax * rate / 100;
                paidTax += taxToPay;
                previousMax = max;
                isDone = yearGrossPay < max;
            }
        });
        return paidTax;
    }

    const calculateYearSecondaryPaye = (yearGrossPay: number) => {
        const taxThresholdIndex = taxThresholds.findIndex((threshold: TaxThreshold) => yearGrossPay < (threshold.max ? parseFloat(threshold.max) : Infinity));
        const actualThreshold = taxThresholds[taxThresholdIndex];
        return secondaryIncome * parseFloat(actualThreshold.rate) / 100;
    }

    const calculcateYearAcc = (yearGrossPay: number) => {
        return Math.min(Math.max(yearGrossPay, ACC.minIncome), ACC.incomeCap) / 100 * ACC.levy;
    }

    const calculateYearGrossPay = (income: number) => {
        let newIncome = income;
        switch (incomePeriod.value) {
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

        return newIncome;
    }

    const calculateYearlyValues = () => {
        const yearPrimaryGrossPay = calculateYearGrossPay(primaryIncome);

        const yearSecondaryPaye = calculateYearSecondaryPaye(yearPrimaryGrossPay);
        const yearPrimaryPaye = calculateYearlyPaye(yearPrimaryGrossPay);

        const yearAcc = calculcateYearAcc(yearPrimaryGrossPay);
        const yearKiwiSaver = calculateYearKiwiSaver(yearPrimaryGrossPay);
        const yearStudentLoan = calculateYearStudentLoan(yearPrimaryGrossPay);

        return {
            yearGrossPay: yearPrimaryGrossPay,
            yearPaye: yearPrimaryPaye,
            yearAcc,
            yearKiwiSaver,
            yearStudentLoan,
            yearSecGrossPay: secondaryIncome,
            yearSecPaye: yearSecondaryPaye
        };
    }

    const onTaxThresholdsChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, index: number, isRate: boolean) => {
        setTaxThresholds(prevState => {
            const newThresholds = [...prevState];
            if (isRate) {
                newThresholds[index].rate = e.nativeEvent.text || "";
            } else {
                newThresholds[index].max = e.nativeEvent.text || "";
            }

            return newThresholds;
        });
    }

    const onCloseFilterModal = () => {
        setTaxThresholds(prevState => {
            const newThresholds = [...prevState];
            newThresholds.forEach((threshold, index) => {
                if (!threshold.max) {
                    newThresholds[index].max = TAX_THRESHOLDS[index].max;
                }

                if (!threshold.rate) {
                    newThresholds[index].rate = TAX_THRESHOLDS[index].rate;
                }
            });

            return newThresholds;
        });
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
        taxThresholds,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onKiwiSaverChange,
        onStudentLoanChange,
        setHasKiwiSaver,
        setHasStudentLoan,
        setHasSecondaryIncome,
        setKiwiSaverOption,
        setSecondaryIncome,
        calculateYearlyValues,
        onTaxThresholdsChange,
        onCloseFilterModal,
    }
}

export default useIncome;
