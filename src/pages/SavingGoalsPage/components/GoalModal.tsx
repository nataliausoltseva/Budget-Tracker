import { useContext, useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, TextInputChangeEventData, View } from "react-native";
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
        <View>
            <CustomModal isVisible={isVisible} onClose={_onClose} style={{ width: 300 }}>
                <CustomText style={{ textAlign: "center", marginBottom: 25 }}>
                    {goal === null ? "New" : "Your"} goal
                </CustomText>
                <CustomInput
                    label={"Name"}
                    placeholder='Enter your goal name'
                    value={name}
                    onChange={onNameChange}
                />
                <View style={{ flexDirection: "row", flexGrow: 1, justifyContent: "space-between", marginTop: 20 }}>
                    <CustomInput
                        label={"Goal amount"}
                        value={amount}
                        onChange={onAmountChange}
                        style={{ width: 110 }}
                        isNumeric
                    />
                    <CustomInput
                        label={"Saved amount"}
                        value={savedAmount}
                        onChange={onSavedAmountChange}
                        style={{ width: 110 }}
                        isNumeric
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CustomText style={{ marginBottom: 10, fontSize: 12 }}>Date by</CustomText>
                    <DatePicker
                        value={new Date(date.toString())}
                        onChange={setDate}
                        min={tomorrow}
                    />
                </View>
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <View style={{ width: 150 }}>
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
