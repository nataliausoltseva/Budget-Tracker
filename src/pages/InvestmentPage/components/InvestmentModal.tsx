import { useContext, useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native"
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import Dropdown from "../../../components/Dropdown";
import { AppContext } from "../../../context/AppContext";
import DatePicker from "../../../components/DatePicker";

type Props = {
    onClose: () => void,
    onSave: (item: InvestmentItem) => void,
    investment?: InvestmentItem | null,
}

export const PERIODS: TermPeriod[] = [
    {
        name: "month",
        label: "Month"
    },
    {
        name: "year",
        label: "Year"
    }
];

const DEFAULT_STATE = {
    name: '',
    amount: "0",
    rate: "0",
    term: "6",
    termPeriod: PERIODS[0],
    taxRate: "0",
    startDate: new Date()
};

const InvestmentModal = ({ onSave, onClose, investment = null }: Props) => {
    const appState = useContext(AppContext);
    const [item, setItem] = useState(DEFAULT_STATE);

    useEffect(() => {
        if (investment) {
            setItem({
                ...investment,
                amount: investment.amount.toString(),
                rate: investment.rate.toString(),
                term: investment.term.toString(),
                termPeriod: investment.termPeriod,
                taxRate: investment.taxRate.toString(),
            });
        }
    }, [investment]);

    const _onNameChange = (name: string) => {
        setItem({
            ...item,
            name: name || ""
        });
    }

    const _onAmountChange = (amount: string) => {
        setItem({
            ...item,
            amount: amount || ""
        });
    }

    const _onRateChange = (rate: string) => {
        setItem({
            ...item,
            rate: rate || ""
        });
    }

    const _onTermChange = (term: string) => {
        setItem({
            ...item,
            term: term || ""
        });
    }

    const _onTaxRateChange = (taxRate: string) => {
        setItem({
            ...item,
            taxRate: taxRate || ""
        });
    }

    const _onStartDateChange = (date: Date) => {
        setItem({
            ...item,
            startDate: date,
        });
    }

    const onTermPeriodChange = (index: number) => {
        setItem({
            ...item,
            termPeriod: PERIODS[index],
        });
    }

    const _onSave = () => {
        onSave({
            ...item,
            amount: isNaN(parseFloat(item.amount)) ? 0 : parseFloat(item.amount),
            rate: isNaN(parseFloat(item.rate)) ? 0 : parseFloat(item.rate),
            term: isNaN(parseFloat(item.term)) ? 0 : parseFloat(item.term),
            taxRate: isNaN(parseFloat(item.taxRate)) ? 0 : parseFloat(item.taxRate),
        });
        _onClose();
    }

    const _onClose = () => {
        setItem(DEFAULT_STATE);
        onClose();
    }

    const styles = StyleSheet.create({
        modal: {
            width: 300
        },
        title: {
            textAlign: "center",
            marginBottom: 20
        },
        inputContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
        },
        relativeCentre: {
            position: "relative",
            justifyContent: "center"
        },
        bigInput: {
            width: 115
        },
        percent: {
            position: "absolute",
            right: 0,
            paddingTop: 12
        },
        margin: {
            marginBottom: 10
        },
        smallInput: {
            width: 50
        },
        term: {
            flexDirection: "row"
        },
        terms: {
            marginTop: 5,
            marginLeft: 10
        },
        largeInput: {
            width: 90
        },
        button: {
            width: 150
        },
        date: {
            fontSize: 12
        },
        saveButtonContainer: {
            alignItems: "center",
            marginTop: 30
        }
    })

    return (
        <View>
            <CustomModal onClose={_onClose} style={styles.modal} isVisible>
                <CustomText style={styles.title}>{investment === null ? "New" : "Your"} instment</CustomText>
                <CustomInput
                    label={"Name"}
                    placeholder='Enter expense name'
                    value={item.name}
                    onChange={_onNameChange}
                />
                <View style={styles.inputContainer}>
                    <CustomInput
                        label={"Amount"}
                        value={item.amount.toString()}
                        onChange={_onAmountChange}
                        style={styles.bigInput}
                        isNumeric
                    />
                    <View style={styles.relativeCentre}>
                        <CustomInput
                            label={"Tax rate"}
                            value={item.taxRate}
                            onChange={_onTaxRateChange}
                            style={styles.bigInput}
                            max={100}
                            isNumeric
                        />
                        {item.taxRate !== "" && (
                            <View style={styles.percent}>
                                <CustomText>%</CustomText>
                            </View>
                        )}
                    </View>
                </View>
                <View style={[styles.inputContainer, styles.margin]}>
                    <View style={styles.term}>
                        <CustomInput
                            label={"Term"}
                            value={item.term.toString()}
                            onChange={_onTermChange}
                            style={styles.smallInput}
                            isNumeric
                        />
                        <View style={styles.terms}>
                            <Dropdown
                                value={item.termPeriod.label}
                                onSelect={onTermPeriodChange}
                                list={PERIODS.map(p => p.label)}
                                width={75}
                            />
                        </View>
                    </View>
                    <View style={styles.relativeCentre}>
                        <CustomInput
                            label={"Term Rate"}
                            value={item.rate.toString()}
                            onChange={_onRateChange}
                            style={styles.largeInput}
                            max={100}
                            isNumeric
                        />
                        {item.taxRate !== "" && (
                            <View style={styles.percent}>
                                <CustomText>%</CustomText>
                            </View>
                        )}
                    </View>
                </View>
                <CustomText style={styles.date}>Start date</CustomText>
                <DatePicker
                    value={new Date(item.startDate.toString())}
                    onChange={_onStartDateChange}
                />
                <View style={styles.saveButtonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Save"
                            onPress={_onSave}
                            disabled={!item.name || !item.amount || item.amount === "0"}
                            color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                        />
                    </View>
                </View>
            </CustomModal >
        </View >
    )
}

export default InvestmentModal;
