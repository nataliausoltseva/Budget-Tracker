import { getDateDiffSeconds } from "../../../hooks/date";

const useCountdown = ({ startDate, numMonths }: { startDate: Date, numMonths: number }) => {
    const newDate = new Date(startDate);
    const endDate = new Date(newDate.setMonth(newDate.getMonth() + numMonths));;

    return {
        seconds: getDateDiffSeconds(endDate)
    }
};

export default useCountdown;