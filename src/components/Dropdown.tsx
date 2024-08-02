import React, { FC, useContext, useRef, useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import CustomText from './CustomText';
import { AppContext } from '../context/AppContext';

type Props = {
    onSelect: (item: number) => void,
    value: string,
    list: string[],
    width?: number,
}

const Dropdown: FC<Props> = ({ onSelect, value, list, width = null }) => {
    const appState = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownMeasurements, setDropdownMeasurements] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef<any>(null);

    const openDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
                setDropdownMeasurements({ top: py + height, left: px, width });
                setModalVisible(true);
            });
        }
    };

    const handleSelectItem = (index: number) => {
        onSelect(index);
        setModalVisible(false);
    };

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        dropdown: {
            padding: 10,
            borderBottomColor: appState.isDarkMode ? "white" : "black",
            borderBottomWidth: 1,
            borderRadius: 5,
            width: width || '100%',
        },
        modalContent: {
            backgroundColor: appState.isDarkMode ? "#2F244D" : "white",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            shadowOffset: {
                width: 0,
                height: -6,
            },
            shadowOpacity: 1,
            shadowColor: appState.isDarkMode ? "white" : "black",
            elevation: 2,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity ref={dropdownRef} onPress={openDropdown} style={styles.dropdown}>
                <CustomText style={{ textAlign: "center" }}>{value}</CustomText>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1 }}>
                    <View
                        style={[
                            styles.modalContent,
                            {
                                top: dropdownMeasurements.top,
                                left: dropdownMeasurements.left,
                                width: dropdownMeasurements.width,
                            }
                        ]}>
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
                            style={{ maxHeight: 40 * Math.min(list.length, 4) }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default Dropdown;
