import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { AppContext } from '../context/AppContext';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onSelect: (index: IndexPath | IndexPath[]) => void,
    value: string,
    list: string[] | Item[]
}

type Item = {
    label: string,
    value?: string,
}

const Dropdown = ({ style, onSelect, value, list }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const appState = useContext(AppContext);

    const _onSelect = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);
        onSelect(index);
    }


    const styles = StyleSheet.create({
        layout: {
            borderBottomColor: appState.isDarkMode ? "white" : "black",
            borderBottomWidth: 1,
        },
    })

    return (
        <Layout level='1' style={[style, styles.layout]}>
            <Select
                selectedIndex={selectedIndex}
                onSelect={_onSelect}
                value={value}
            >
                {list.map((item: Item) => (
                    <SelectItem title={item.label} key={item.value} />
                ))}
            </Select>
        </Layout>
    )
}

export default Dropdown;