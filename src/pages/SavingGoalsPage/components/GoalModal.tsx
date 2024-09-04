import { useContext, useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomModal from "../../../components/CustomModal";
import { AppContext } from "../../../context/AppContext";
import DatePicker from "../../../components/DatePicker";

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
    const appState = useContext(AppContext);
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const [name, setName] = useState(goal?.name || "");
    const [amount, setAmount] = useState(goal?.amount?.toString() || "0");
    const [savedAmount, setSavedAmount] = useState(goal?.savedAmount?.toString() || "0");
    const [date, setDate] = useState<Date>(goal?.date ? new Date(goal.date.toString()) : tomorrow);

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

    const onNameChange = (name: string) => {
        setName(name || "");
    }

    const onAmountChange = (amount: string) => {
        setAmount(amount);
    }

    const onSavedAmountChange = (amount: string) => {
        setSavedAmount(amount);
    }

    const _onClose = () => {
        setName("");
        setDate(tomorrow);
        setAmount("0");
        setSavedAmount("0");
        onClose();
    }

    const styles = StyleSheet.create({
        modal: {
            width: 300
        },
        title: {
            textAlign: "center",
            marginBottom: 25
        },
        inputs: {
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "space-between",
            marginTop: 20
        },
        input: {
            width: 110
        },
        datePicker: {
            marginTop: 20
        },
        date: {
            marginBottom: 10,
            fontSize: 12
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 30
        },
        button: {
            width: 150
        }
    })

    return (
        <View>
            <CustomModal isVisible={isVisible} onClose={_onClose} style={styles.modal}>
                <CustomText style={styles.title}>{goal === null ? "New" : "Your"} goal</CustomText>
                <CustomInput
                    label={"Name"}
                    placeholder='Enter your goal name'
                    value={name}
                    onChange={onNameChange}
                />
                <View style={styles.inputs}>
                    <CustomInput
                        label={"Goal amount"}
                        value={amount}
                        onChange={onAmountChange}
                        style={styles.input}
                        isNumeric
                    />
                    <CustomInput
                        label={"Saved amount"}
                        value={savedAmount}
                        onChange={onSavedAmountChange}
                        style={styles.input}
                        isNumeric
                    />
                </View>
                <View style={styles.datePicker}>
                    <CustomText style={styles.date}>Date by</CustomText>
                    <DatePicker
                        value={new Date(date.toString())}
                        onChange={setDate}
                        min={tomorrow}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Save"
                            onPress={_onSave}
                            disabled={!name || !amount || amount === "0" || !date}
                        />
                    </View>
                </View>
            </CustomModal>
        </View>
    )
}

export default GoalModal;
