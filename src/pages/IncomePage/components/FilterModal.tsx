import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import KiwiSaverForm from './KiwiSaverForm';
import StudentLoanForm from './StudentLoanForm';
import SecondaryIncomeForm from './SecondaryIncomeForm';
import CheckBox from '../../../components/Checkbox';
import CustomText from '../../../components/CustomText';
import CustomInput from '../../../components/CustomInput';

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
    taxThresholds: TaxThreshold[],
    onTaxThresholdsChange: (e: NativeSyntheticEvent<TextInputChangeEventData>, index: number, isRate: boolean) => void,
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
    taxThresholds,
    onTaxThresholdsChange,
}: Props) => {
    return (
        <CustomModal onClose={onClose} isVisible={true} style={{ gap: 10 }}>
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
            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 20 }}>
                <View>
                    <CustomText>Income Thresholds</CustomText>
                    {taxThresholds.map((threshold: TaxThreshold, index: number) => (
                        <CustomInput
                            key={index}
                            style={[styles.input, { textAlign: "center" }]}
                            value={index === taxThresholds.length - 1 ? (taxThresholds[taxThresholds.length - 2].max + 1).toString() + "+" : threshold.max.toString()}
                            onChange={(e) => onTaxThresholdsChange(e, index, false)}
                            isEditable={index < taxThresholds.length - 1}
                            isNumeric
                        />
                    ))}
                </View>
                <View>
                    <CustomText>Tax Rates</CustomText>
                    {taxThresholds.map((threshold: TaxThreshold, index: number) => (
                        <CustomInput
                            key={index}
                            style={[styles.input, { textAlign: "center" }]}
                            value={threshold.rate.toString()}
                            onChange={(e) => onTaxThresholdsChange(e, index, true)}
                            isNumeric
                        />
                    ))}
                </View>
            </View>
        </CustomModal>
    )
}

export default FilterModal;

const styles = StyleSheet.create({
    input: {
        marginLeft: 10,
        width: 70
    }
});