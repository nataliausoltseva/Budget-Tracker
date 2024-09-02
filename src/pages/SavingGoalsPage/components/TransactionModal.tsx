import { useContext, useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { AppContext } from "../../../context/AppContext";
import DatePicker from "../../../components/DatePicker";

type Props = {
    isVisible: boolean,
    onSave: (transaction: TransactionItem) => void,
    onClose: () => void
    goalTotalSaved?: number,
    transaction?: TransactionItem,
}

const TransactionModal = ({ goalTotalSaved = 0, transaction, isVisible = false, onSave, onClose }: Props) => {
    const appState = useContext(AppContext);
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


    const styles = StyleSheet.create({
        container: {
            minHeight: 192,
        },
        modal: {
            width: 250
        },
        title: {
            textAlign: "center",
            marginBottom: 20
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
            marginTop: 20
        },
        button: {
            width: 100
        }
    });

    return (
        <View style={styles.container}>
            <CustomModal
                isVisible={true}
                onClose={_onClose}
                style={styles.modal}
            >
                <CustomText style={styles.title}>{transaction === null ? "New" : "Your"} transaction</CustomText>
                <CustomInput
                    label={"Amount"}
                    placeholder='Transaction amount'
                    value={amount}
                    onChange={onAmountChange}
                    isNumeric
                />
                <View style={styles.datePicker}>
                    <CustomText style={styles.date}>Date by</CustomText>
                    <DatePicker
                        value={date}
                        onChange={setDate}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title={"Save"}
                            onPress={_onSave}
                            disabled={amount === '' || amount === '0'}
                            color={appState.isDarkMode ? "#A78DFF" : "#01B0E6"}
                        />
                    </View>
                </View>
            </CustomModal>
        </View>
    )
}

export default TransactionModal;
