import { Icon, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppContext } from '../context/AppContext';
import CustomText from './CustomText';
import ChevronIcon from './ChevronIcon';

type Props = {
    listStyle?: StyleProp<ViewStyle> | undefined,
    containerStyle?: StyleProp<ViewStyle> | undefined,
    onSelect: (index: IndexPath | IndexPath[]) => void,
    value: string,
    list: string[]
}

type Item = {
    label: string,
    value?: string,
}

const Dropdown = ({ containerStyle, listStyle, onSelect, value, list }: Props) => {
    const [show, setShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const appState = useContext(AppContext);

    const toggleDropdown = () => {
        setShow(prevState => !prevState);
    }

    const _onSelect = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);
        onSelect(index);
    }

    return (
        <TouchableOpacity style={[{ flexDirection: 'column', position: "relative" }]} onPress={() => setShow(false)}>
            <TouchableOpacity onPress={toggleDropdown} style={[styles.button, containerStyle]}>
                <CustomText style={styles.buttonText}>{value}</CustomText>
                <ChevronIcon />
            </TouchableOpacity>
            <Modal visible={show} transparent animationType="none" style={{ backgroundColor: "red" }}>
                <TouchableOpacity
                    onPress={() => setShow(false)}
                    style={{ flexGrow: 1 }}
                >
                    <View style={{ top: 110 }}>
                        <FlatList
                            data={list}
                            renderItem={(item) => (
                                <CustomText
                                    style={[{ height: 40, textAlign: "center", paddingTop: 10 }, listStyle]}
                                    onPress={() => console.log(item)}
                                >
                                    {item.item}
                                </CustomText>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ height: 200 }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </TouchableOpacity>
    )
}

export default Dropdown;

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: 'center',
        height: 40,
        width: "100%",
        zIndex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    dropdown: {
        // position: 'absolute',
        top: 100,
        width: "100%"
    },
    wrapper: {
        justifyContent: "center",
        backgroundColor: 'red',
        alignItems: "center"
    },
});