import React, { useRef } from 'react';
import { NativeSyntheticEvent, SafeAreaView, TextInputChangeEventData } from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';

type Props = {
    option: number,
    setKiwiSaverOption: (option: number) => void,
    isEditable: boolean,
}

const KiwiSaverForm = ({ option, setKiwiSaverOption, isEditable = false }: Props) => {
    const inputHolder = useRef(option.toString());

    const onCustomOptionChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        inputHolder.current = e.nativeEvent.text || "";

        if (inputHolder.current) {
            setKiwiSaverOption(parseFloat(inputHolder.current));
        } else if (!e.nativeEvent.text) {
            setKiwiSaverOption(0);
        }
        setKiwiSaverOption(parseInt(e.nativeEvent.text));
    }

    return (
        <SafeAreaView>
            <CustomInput
                value={inputHolder.current}
                onChange={onCustomOptionChange}
                style={{
                    width: 100
                }}
                isEditable={isEditable}
                isNumeric
            />
        </SafeAreaView>
    )
}

export default KiwiSaverForm;