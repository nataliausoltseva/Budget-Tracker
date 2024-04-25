import { useEffect, useRef, useState } from "react";
import { incomePeriods } from "../../../constants";

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

    const onPrimaryIncomeChange = (income: number) => {
        setPrimaryIncome(income);

        // period is set to auto
        if (isIncomePeriodAuto.current) {
            setIncomePeriod(calculatePeriod(income));
        }
    }

    const onIncomePeriodChange = (period: IncomePeriod) => {
        setIncomePeriod(period);
        isIncomePeriodAuto.current = period.value === 'auto';
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
