import React from 'react';
import { View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import KiwiSaverForm from './KiwiSaverForm';
import StudentLoanForm from './StudentLoanForm';
import SecondaryIncomeForm from './SecondaryIncomeForm';
import CheckBox from '../../../components/Checkbox';

type Props = {
    onClose: () => void,
    hasKiwiSaver: boolean,
    setHasKiwiSaver: (value: boolean) => void,
    kiwiSaverOption: number,
    onKiwiSaverChange: (option: number) => void,
    hasStudentLoan: boolean,
    setHasStudentLoan: (value: boolean) => void,
    studentLoanRate: number,
    studentLoanThreshold: number,
    onStudentLoanChange: (rate: number | null, threshold: number | null) => void,
    hasSecondaryIncome: boolean,
    setHasSecondaryIncome: (value: boolean) => void,
    secondaryIncome: number,
    setSecondaryIncome: (value: number) => void,
}

const FilterModal = ({
    onClose,
    hasKiwiSaver = false,
    setHasKiwiSaver,
    kiwiSaverOption,
    onKiwiSaverChange,
    hasStudentLoan,
    setHasStudentLoan,
    studentLoanRate,
    studentLoanThreshold,
    onStudentLoanChange,
    hasSecondaryIncome,
    setHasSecondaryIncome,
    secondaryIncome,
    setSecondaryIncome,
}: Props) => {
    return (
        <CustomModal onClose={onClose} isVisible={true}>
            <View style={{ flexDirection: "row" }}>
                <CheckBox
                    isChecked={hasKiwiSaver}
                    onPress={nextChecked => setHasKiwiSaver(nextChecked)}
                    label={"KiwiSaver"}
                />
                <KiwiSaverForm
                    option={kiwiSaverOption}
                    setKiwiSaverOption={onKiwiSaverChange}
                    isEditable={hasKiwiSaver}
                />
            </View>
            <View>
                <CheckBox
                    isChecked={hasStudentLoan}
                    onPress={nextChecked => setHasStudentLoan(nextChecked)}
                    label='Student Loan'
                />
                <StudentLoanForm
                    rate={studentLoanRate}
                    threshold={studentLoanThreshold}
                    setRate={(rate: number) => onStudentLoanChange(rate, null)}
                    setThreshold={(threshold: number) => onStudentLoanChange(null, threshold)}
                    isEditable={hasStudentLoan}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <CheckBox
                    isChecked={hasSecondaryIncome}
                    onPress={nextChecked => setHasSecondaryIncome(nextChecked)}
                    label='Secondary Income'
                />
                <SecondaryIncomeForm
                    income={secondaryIncome}
                    setIncome={setSecondaryIncome}
                    isEditable={hasSecondaryIncome}
                />
            </View>
        </CustomModal>
    )
}

export default FilterModal;