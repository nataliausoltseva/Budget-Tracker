import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";

type Props = {
    isVisible: boolean,
    onSave: (transaction: TransactionItem) => void,
    onClose: () => void
    goalTotalSaved?: number,
    transaction?: TransactionItem,
}

const TransactionModal = ({ goalTotalSaved = 0, transaction, isVisible = false, onSave, onClose }: Props) => {
    const now = new Date();

    const [amount, setAmount] = useState("0");
    const [date, setDate] = useState<Date>(now);

    useEffect(() => {
        if (transaction) {
            setAmount(transaction.amount.toString());
            setDate(transaction.date);
        }
    }, [transaction]);

    const _onSave = () => {
        onSave({
            amount: parseFloat(amount),
            date: date,
            totalSaved: transaction ? transaction.totalSaved + (transaction.amount - parseFloat(amount)) : goalTotalSaved + parseFloat(amount),
        });
        _onClose();
    }

    const onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setAmount(e.nativeEvent.text);
    }

    const _onClose = () => {
        setDate(now);
        setAmount("0");
        onClose();
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={isVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={_onClose}
            >
                <Card disabled={true}>
                    <Text>
                        Add transaction to your goal
                    </Text>
                    <Input
                        label={"Amount"}
                        placeholder='Transaction amount'
                        value={amount}
                        onChange={onAmountChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Datepicker
                        label={"Date by"}
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                    />
                    <Button onPress={_onSave} disabled={amount === ''}>
                        Save
                    </Button>
                </Card>
            </Modal>
        </View>
    )
}

export default TransactionModal;

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});