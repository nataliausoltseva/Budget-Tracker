import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import SuperannuationForm from './SuperannuationForm';
import StudentLoanForm from './StudentLoanForm';
import SecondaryIncomeForm from './SecondaryIncomeForm';
import CheckBox from '../../../components/Checkbox';
import CustomText from '../../../components/CustomText';
import CustomInput from '../../../components/CustomInput';

type Props = {
    onClose: () => void,
    hasSuperannuation: boolean,
    setHasSuperannuation: (value: boolean) => void,
    superannuationOption: number,
    onSuperannuationChange: (option: number) => void,
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
    onTaxThresholdsChange: (value: string, index: number, isRate: boolean) => void,
}

const FilterModal = ({
    onClose,
    hasSuperannuation = false,
    setHasSuperannuation,
    superannuationOption,
    onSuperannuationChange,
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
        <CustomModal onClose={onClose} isVisible={true} style={styles.modal}>
            <View style={styles.container}>
                <CheckBox
                    isChecked={hasSuperannuation}
                    onPress={nextChecked => setHasSuperannuation(nextChecked)}
                    label={"Superannuation"}
                />
                <SuperannuationForm
                    option={superannuationOption}
                    setSuperannuationOption={onSuperannuationChange}
                    isEditable={hasSuperannuation}
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
            <View style={styles.container}>
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
            <View style={styles.taxBracketsContainer}>
                <View>
                    <CustomText>Income Thresholds</CustomText>
                    {taxThresholds.map((threshold: TaxThreshold, index: number) => (
                        <CustomInput
                            key={`${index}-thresholds`}
                            style={[styles.input, styles.inputText]}
                            value={index === taxThresholds.length - 1 ? (taxThresholds[taxThresholds.length - 2].max + 1).toString() + "+" : threshold.max.toString()}
                            onChange={(value: string) => onTaxThresholdsChange(value, index, false)}
                            isEditable={index < taxThresholds.length - 1}
                            isNumeric
                        />
                    ))}
                </View>
                <View>
                    <CustomText>Tax Rates</CustomText>
                    {taxThresholds.map((threshold: TaxThreshold, index: number) => (
                        <View style={styles.taxBracketWrapper} key={`${index}-rate`}>
                            <CustomInput
                                style={[styles.input, styles.inputText]}
                                value={threshold.rate}
                                onChange={(value: string) => onTaxThresholdsChange(value, index, true)}
                                max={100}
                                isNumeric
                            />
                            {threshold.rate && (
                                <View style={styles.percent}>
                                    <CustomText>%</CustomText>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </CustomModal>
    )
}

export default FilterModal;


const styles = StyleSheet.create({
    modal: {
        gap: 10
    },
    container: {
        flexDirection: "row"
    },
    taxBracketsContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginTop: 20
    },
    inputText: {
        textAlign: "center"
    },
    input: {
        marginLeft: 10,
        width: 70
    },
    taxBracketWrapper: {
        position: "relative",
        justifyContent: "center"
    },
    percent: {
        position: "absolute",
        right: 0
    }
});