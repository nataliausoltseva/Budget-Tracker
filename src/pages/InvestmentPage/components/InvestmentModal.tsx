import { Button, Card, Datepicker, IndexPath, Input, Layout, Modal, Select, SelectItem, Text } from "@ui-kitten/components"
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native"

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
    const [item, setItem] = useState(DEFAULT_STATE);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

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

    const onTermPeriodChange = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);

        if (index instanceof IndexPath) {
            setItem({
                ...item,
                termPeriod: PERIODS[index.row],
            });
        }
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
                        label={"Interest Rate:"}
                        value={item.rate.toString()}
                        onChange={_onRateChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <Input
                            label={"Term:"}
                            value={item.term.toString()}
                            onChange={_onTermChange}
                            style={{ minWidth: 100 }}
                            {...{
                                keyboardType: "numeric"
                            }}
                        />
                        <Layout style={{ minWidth: 150 }} level='1'>
                            <Select
                                selectedIndex={selectedIndex}
                                onSelect={onTermPeriodChange}
                                value={item.termPeriod.label}
                            >
                                {PERIODS.map((period: TermPeriod) => (
                                    <SelectItem title={period.label} key={period.name} />
                                ))}
                            </Select>
                        </Layout>
                    </View>
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