import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components"
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native"

type Props = {
    onClose: () => void,
    onSave: (item: InvestmentItem) => void,
    investment?: InvestmentItem | null,
}

const DEFAULT_STATE = {
    name: '',
    amount: "0",
    rate: "0",
    term: "0.583",
    taxRate: "0",
    startDate: new Date()
};

const InvestmentModal = ({ onSave, onClose, investment = null }: Props) => {
    const [item, setItem] = useState(DEFAULT_STATE);

    useEffect(() => {
        if (investment) {
            setItem({
                ...investment,
                amount: investment.amount.toString(),
                rate: investment.rate.toString(),
                term: investment.term.toString(),
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
        <View style={styles.container}>
            <Modal
                visible={true}
                backdropStyle={styles.backdrop}
                onBackdropPress={_onClose}
            >
                <Card disabled={true}>
                    <Text>
                        Your new instment
                    </Text>
                    <Input
                        label={"Name:"}
                        placeholder='Enter expense name'
                        value={item.name}
                        onChange={_onNameChange}
                    />
                    <View>
                        <Input
                            label={"Amount:"}
                            value={item.amount.toString()}
                            onChange={_onAmountChange}
                            {...{
                                keyboardType: "numeric"
                            }}
                        />
                        <Text style={styles.dollarSign}>$</Text>
                    </View>
                    <Input
                        label={"Rate:"}
                        value={item.rate.toString()}
                        onChange={_onRateChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Input
                        label={"Term (in years):"}
                        value={item.term.toString()}
                        onChange={_onTermChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Input
                        label={"Tax rate:"}
                        value={item.taxRate.toString()}
                        onChange={_onTaxRateChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Datepicker
                        label={"Start date:"}
                        date={item.startDate}
                        onSelect={_onStartDateChange}
                    />
                    <Button onPress={_onSave} disabled={!item.name || !item.amount || item.amount === "0"}>
                        Save
                    </Button>
                </Card>
            </Modal>
        </View>
    )
}

export default InvestmentModal;

const styles = StyleSheet.create({
    dollarSign: {
        position: "absolute",
        zIndex: 5,
        color: "red",
        top: "50%",
        left: "2%",
    },
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});