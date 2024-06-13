import React from 'react';
import CustomModal from '../../../components/CustomModal';
import { CheckBox } from '@ui-kitten/components';
import KiwiSaverForm from './KiwiSaverForm';
import StudentLoanForm from './StudentLoanForm';
import SecondaryIncomeForm from './SecondaryIncomeForm';
import { View } from 'react-native';

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
                    checked={hasKiwiSaver}
                    onChange={nextChecked => setHasKiwiSaver(nextChecked)}
                >
                    KiwiSaver
                </CheckBox>
                <KiwiSaverForm
                    option={kiwiSaverOption}
                    setKiwiSaverOption={onKiwiSaverChange}
                    isEditable={hasKiwiSaver}
                />
            </View>
            <View>
                <CheckBox
                    checked={hasStudentLoan}
                    onChange={nextChecked => setHasStudentLoan(nextChecked)}
                >
                    Student Loan
                </CheckBox>
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
                    checked={hasSecondaryIncome}
                    onChange={nextChecked => setHasSecondaryIncome(nextChecked)}
                >
                    Secondary Income
                </CheckBox>
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