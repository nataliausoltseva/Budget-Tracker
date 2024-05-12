import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components";
import moment from "moment";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";

type Props = {
    onSave: (goal: SavingGoalItem) => void,
    isVisible: boolean,
    onClose: () => void,
    nameValue?: string,
    amountValue?: string,
    savedAmountValue?: string,
    dateValue?: Date | null,
}

const AddModal = ({ onSave, isVisible = false, onClose, nameValue = "", amountValue = "0", savedAmountValue = "0", dateValue = null }: Props) => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const [name, setName] = useState(nameValue);
    const [amount, setAmount] = useState(amountValue);
    const [savedAmount, setSavedAmount] = useState(savedAmountValue);
    const [date, setDate] = useState<Date>(dateValue || tomorrow);

    const _onSave = () => {
        onSave({
            name,
            amount: parseFloat(amount),
            savedAmount: parseFloat(savedAmount),
            date,
            isReached: parseFloat(savedAmount) >= parseFloat(amount)
        });
        _onClose();
    }

    const onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setName(e.nativeEvent.text || "");
    }

    const onAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setAmount(e.nativeEvent.text);
    }

    const onSavedAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSavedAmount(e.nativeEvent.text);
    }

    const _onClose = () => {
        setName("");
        setDate(tomorrow);
        setAmount("0");
        setSavedAmount("0");
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
                        Your new goal
                    </Text>
                    <Input
                        label={"Name"}
                        placeholder='Enter your goal name'
                        value={name}
                        onChange={onNameChange}
                    />
                    <Input
                        label={"Goal amount"}
                        value={amount}
                        onChange={onAmountChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Input
                        label={"Saved amount"}
                        value={savedAmount}
                        onChange={onSavedAmountChange}
                        {...{
                            keyboardType: "numeric"
                        }}
                    />
                    <Datepicker
                        label={"Date by"}
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                        min={tomorrow}
                    />
                    <Button onPress={_onSave} disabled={!name || !amount || amount === "0" || !date}>
                        Save
                    </Button>
                </Card>
            </Modal>
        </View>
    )
}

export default AddModal;

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});