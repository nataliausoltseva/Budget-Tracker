import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";

type Props = {
    amountValue?: string,
    dateValue?: Date | null,
    isVisible: boolean,
    onSave: (transaction: TransactionItem) => void,
    onClose: () => void
}

const TransactionModal = ({ amountValue = "0", dateValue = null, isVisible = false, onSave, onClose }: Props) => {
    const now = new Date();

    const [amount, setAmount] = useState(amountValue);
    const [date, setDate] = useState<Date>(dateValue || now);

    const _onSave = () => {
        onSave({
            amount: parseFloat(amount),
            date: date,
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
                    <Button onPress={_onSave} disabled={!amount || amount === "0"}>
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