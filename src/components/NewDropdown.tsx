import React, { FC, useContext, useRef, useState } from 'react';
import { FlatList, Modal, SafeAreaView, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import { AppContext } from '../context/AppContext';

type Props = {
    listStyle?: StyleProp<ViewStyle> | undefined,
    containerStyle?: StyleProp<ViewStyle> | undefined,
    onSelect: (item: number) => void,
    value: string,
    list: string[]
}

const Dropdown: FC<Props> = ({ containerStyle, listStyle, onSelect, value, list }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [dropdownSize, setDropdownSize] = useState({ width: 0 });
    const dropdownRef = useRef(null);

    const openDropdown = () => {
        dropdownRef.current.measure((fx, fy, width, height, px, py) => {
            setDropdownPosition({ top: py + height, left: px + width });
            setDropdownSize({ width })
            setModalVisible(true);
        });
    };

    const handleSelectItem = (index: number) => {
        onSelect(index);
        setModalVisible(false);
    };

    console.log(dropdownPosition.top)

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity ref={dropdownRef} onPress={openDropdown} style={styles.dropdown}>
                <Text>{value}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                    flexGrow: 1, justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <View style={[styles.modalContent, { top: dropdownPosition.top, right: dropdownPosition.left, width: dropdownSize.width, backgroundColor: 'red', height: 120 }]}>
                        <FlatList
                            data={list}
                            renderItem={(item) => (
                                <CustomText
                                    style={[{ height: 40, textAlign: "center", paddingTop: 10 }]}
                                    onPress={() => handleSelectItem(item.index)}
                                >
                                    {item.item}
                                </CustomText>
                            )}
                            style={{ height: 120 }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    dropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalContent: {
        width: '80%',
        borderRadius: 5,
        padding: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});