import { Datepicker, Input, Text } from "@ui-kitten/components";
import { useEffect, useRef } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";

type Props = {
    item: InvestmentItem,
    onItemChange: (item: InvestmentItem) => void,
}

const InvestmentItem = ({ item, onItemChange }: Props) => {
    const amountInputHolder = useRef("0");
    const rateInputHolder = useRef("0");
    const termInputHolder = useRef("0");
    const taxRateInputHolder = useRef("10");

    useEffect(() => {
        if (item) {
            amountInputHolder.current = item.amount.toString();
            rateInputHolder.current = item.rate.toString();
            termInputHolder.current = item.term.toString();
            termInputHolder.current = item.term.toString();
            taxRateInputHolder.current = item.taxRate.toString();
        }
    }, [item]);

    const _onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onItemChange({
            ...item,
            name: e.nativeEvent.text || ""
        });
    }

    const _onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        amountInputHolder.current = e.nativeEvent.text || "";
        onItemChange({
            ...item,
            amount: isNaN(parseFloat(amountInputHolder.current)) ? 0 : parseFloat(amountInputHolder.current)
        });
    }

    const _onRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        rateInputHolder.current = e.nativeEvent.text || "";
        onItemChange({
            ...item,
            rate: isNaN(parseFloat(rateInputHolder.current)) ? 0 : parseFloat(rateInputHolder.current)
        });
    }

    const _onTermChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        termInputHolder.current = e.nativeEvent.text || "";
        onItemChange({
            ...item,
            term: isNaN(parseFloat(termInputHolder.current)) ? 0 : parseFloat(termInputHolder.current)
        });
    }

    const _onTaxRateChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        taxRateInputHolder.current = e.nativeEvent.text || "";
        onItemChange({
            ...item,
            taxRate: isNaN(parseFloat(taxRateInputHolder.current)) ? 0 : parseFloat(taxRateInputHolder.current)
        });
    }

    const _onStartDateChange = (date: Date) => {
        onItemChange({
            ...item,
            startDate: date,
        });
    }

    return (
        <View>
            <Input
                label={"Name:"}
                placeholder='Enter expense name'
                value={item.name}
                onChange={_onNameChange}
                style={{ maxWidth: 200 }}
            />
            <View style={styles.incomeView}>
                <Input
                    label={"Amount:"}
                    value={amountInputHolder.current}
                    onChange={_onAmountChange}
                    style={{ minWidth: 100 }}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
                <Text style={styles.dollarSign}>$</Text>
            </View>
            <Input
                label={"Rate:"}
                value={rateInputHolder.current}
                onChange={_onRateChange}
                style={{ minWidth: 100 }}
                {...{
                    keyboardType: "numeric"
                }}
            />
            <Input
                label={"Term (in years):"}
                value={termInputHolder.current}
                onChange={_onTermChange}
                style={{ minWidth: 100 }}
                {...{
                    keyboardType: "numeric"
                }}
            />
            <Input
                label={"Tax rate:"}
                value={taxRateInputHolder.current}
                onChange={_onTaxRateChange}
                style={{ minWidth: 100 }}
                {...{
                    keyboardType: "numeric"
                }}
            />
            <Datepicker
                label={"Start date:"}
                date={item.startDate}
                onSelect={_onStartDateChange}
            />
        </View>
    )
};

export default InvestmentItem;

const styles = StyleSheet.create({
    incomeView: {
        display: "flex",
        flexDirection: 'row',
        position: "relative"
    },
    container: {
        minWidth: 150
    },
    input: {
        flexGrow: 1
    },
    dollarSign: {
        position: "absolute",
        zIndex: 5,
        color: "red",
        top: "28%",
        left: "2%",
    },
    button: {
        width: 20
    }
});