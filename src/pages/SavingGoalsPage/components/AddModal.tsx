import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";

type Props = {
    onSave: (goal: SavingGoalItem) => void,
    isVisible: boolean,
    onClose: () => void,
}

const AddModal = ({ onSave, isVisible = false, onClose }: Props) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("0");
    const [savedAmount, setSavedAmount] = useState("0");
    const [date, setDate] = useState("");

    const _onSave = () => {
        onSave({
            name,
            amount: parseFloat(amount),
            savedAmount: parseFloat(savedAmount),
            date,
            isReached: parseFloat(savedAmount) >= parseFloat(amount)
        })
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

    return (
        <View style={styles.container}>
            <Modal
                visible={isVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={onClose}
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
                    />
                    <Button onPress={_onSave}>
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