import React, { useRef } from 'react';
import { NativeSyntheticEvent, SafeAreaView, TextInputChangeEventData, View } from 'react-native';
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
                    width: 50,
                    marginLeft: 10
                }}
                isEditable={isEditable}
                isNumeric
            />
            {inputHolder.current && (
                <View>
                    <CustomText>%</CustomText>
                </View>
            )}
        </SafeAreaView>
    )
}

export default KiwiSaverForm;