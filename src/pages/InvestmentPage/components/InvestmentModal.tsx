import { useContext, useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, TextInputChangeEventData, View } from "react-native"
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

    const _onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            name: e.nativeEvent.text || ""
        });
    }

    const _onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            amount: e.nativeEvent.text || ""
        });
    }

    const _onRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            rate: e.nativeEvent.text || ""
        });
    }

    const _onTermChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            term: e.nativeEvent.text || ""
        });
    }

    const _onTaxRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItem({
            ...item,
            taxRate: e.nativeEvent.text || ""
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

    return (
        <View>
            <CustomModal isVisible={true} onClose={_onClose} style={{ width: 300 }}>
                <CustomText style={{ textAlign: "center", marginBottom: 20 }}>{investment === null ? "New" : "Your"} instment</CustomText>
                <CustomInput
                    label={"Name"}
                    placeholder='Enter expense name'
                    value={item.name}
                    onChange={_onNameChange}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <CustomInput
                        label={"Amount"}
                        value={item.amount.toString()}
                        onChange={_onAmountChange}
                        style={{ width: 115 }}
                        isNumeric
                    />
                    <CustomInput
                        label={"Tax rate"}
                        value={item.taxRate.toString()}
                        onChange={_onTaxRateChange}
                        style={{ width: 115 }}
                        isNumeric
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <CustomInput
                            label={"Term"}
                            value={item.term.toString()}
                            onChange={_onTermChange}
                            style={{ width: 50 }}
                            isNumeric
                        />
                        <View style={{ marginTop: 5, marginLeft: 10 }}>
                            <Dropdown
                                value={item.termPeriod.label}
                                onSelect={onTermPeriodChange}
                                list={PERIODS.map(p => p.label)}
                                listStyle={{
                                    width: 75,
                                    left: 159,
                                    top: 501,
                                    height: 90
                                }}
                                containerStyle={{
                                    width: 75,
                                    paddingTop: 13
                                }}
                            />
                        </View>
                    </View>
                    <CustomInput
                        label={"Term Rate"}
                        value={item.rate.toString()}
                        onChange={_onRateChange}
                        style={{ width: 90 }}
                        isNumeric
                    />
                </View>
                <CustomText style={{ fontSize: 12 }}>Start date</CustomText>
                <DatePicker
                    value={new Date(item.startDate.toString())}
                    onChange={_onStartDateChange}
                />
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <View style={{ width: 150 }}>
                        <Button
                            title="Save"
                            onPress={_onSave}
                            disabled={!item.name || !item.amount || item.amount === "0"}
                            color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                        />
                    </View>
                </View>
            </CustomModal>
        </View>
    )
}

export default InvestmentModal;
