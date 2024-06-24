import { Button, Card, Datepicker, Input, Modal } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import CustomText from "../../../components/CustomText";

type Props = {
    onSave: (goal: SavingGoalItem) => void,
    isVisible: boolean,
    onClose: () => void,
    nameValue?: string,
    amountValue?: string,
    savedAmountValue?: string,
    dateValue?: Date | null,
    goal?: SavingGoalItem | null,
}

const GoalModal = ({ onSave, isVisible = false, onClose, goal = null }: Props) => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const [name, setName] = useState(goal?.name || "");
    const [amount, setAmount] = useState(goal?.amount?.toString() || "0");
    const [savedAmount, setSavedAmount] = useState(goal?.savedAmount?.toString() || "0");
    const [date, setDate] = useState<Date>(goal?.date || tomorrow);

    useEffect(() => {
        if (goal) {
            setName(goal.name);
            setAmount(goal.amount.toString());
            setSavedAmount(goal.savedAmount.toString());
            setDate(goal.date);
        }
    }, [goal]);

    const _onSave = () => {
        onSave({
            name,
            amount: parseFloat(amount),
            savedAmount: parseFloat(savedAmount),
            date,
            isReached: parseFloat(savedAmount) >= parseFloat(amount),
            transactions: goal?.transactions || []
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
                    <CustomText>
                        Your new goal
                    </CustomText>
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

export default GoalModal;

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});