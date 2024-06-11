import { IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, TextInputChangeEventData } from 'react-native';

type Props = {
    option: number,
    setKiwiSaverOption: (option: number) => void,
    isCustom: boolean,
    setIsCustom: (value: boolean) => void
}

const KiwiSaverForm = ({ option, setKiwiSaverOption, isCustom, setIsCustom }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const inputHolder = useRef("");
    const kiwiSaverOptions = [3, 4, 6, 8, 10, undefined];

    const onCustomOptionChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        inputHolder.current = e.nativeEvent.text || "";

        if (inputHolder.current) {
            setKiwiSaverOption(parseFloat(inputHolder.current));
        } else if (!e.nativeEvent.text) {
            setKiwiSaverOption(0);
        }
        setKiwiSaverOption(parseInt(e.nativeEvent.text));
    }

    const onSelection = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);
        setKiwiSaverOption(kiwiSaverOptions[index.row] || 3);
        setIsCustom(kiwiSaverOptions[index.row] === undefined);
    }

    return (
        <SafeAreaView>
            <Layout level='1' style={{ width: 100 }}>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={onSelection}
                    value={isCustom ? "Custom" : `${option}%`}
                >
                    {kiwiSaverOptions.map((option: number | undefined) => (
                        <SelectItem title={option === undefined ? "Custom" : option} key={option || "custom"} />
                    ))}

                </Select>
            </Layout>
            {isCustom && (
                <Input
                    placeholder={"Income amount"}
                    value={inputHolder.current}
                    onChange={onCustomOptionChange}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
            )}
        </SafeAreaView>
    )
}

export default KiwiSaverForm;