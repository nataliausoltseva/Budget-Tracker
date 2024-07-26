import { getDateDiffSeconds, getEndDate } from "../../../hooks/date";

const useCountdown = ({ startDate, numMonths }: { startDate: Date, numMonths: number }) => {
    const endDate = getEndDate(startDate, numMonths, true);

    return {
        seconds: getDateDiffSeconds(endDate)
    }
};

export default useCountdown;