import React, { useContext, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Modal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppContext } from '../context/AppContext';
import CustomText from './CustomText';
import ChevronIcon from './ChevronIcon';

type Props = {
    listStyle?: StyleProp<ViewStyle> | undefined,
    containerStyle?: StyleProp<ViewStyle> | undefined,
    onSelect: (item: number) => void,
    value: string,
    list: string[]
}

const Dropdown = ({ containerStyle, listStyle, onSelect, value, list }: Props) => {
    const [show, setShow] = useState(false);
    const appState = useContext(AppContext);
    const rotateValue = useRef(new Animated.Value(0)).current;
    const positionInterPol = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

    const toggleDropdown = () => {
        setShow(prevState => !prevState);
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }

    const _onSelect = (index: number) => {
        onSelect(index);
        onClose();
    }

    const onClose = () => {
        setShow(false);
        Animated.timing(rotateValue, {
            toValue: 0,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }

    const styles = StyleSheet.create({
        button: {
            flexDirection: "row",
            alignItems: 'center',
            height: 40,
            width: "100%",
            zIndex: 1,
            borderBottomColor: appState.isDarkMode ? "white" : "black",
            borderBottomWidth: 1,
        },
        buttonText: {
            flex: 1,
            textAlign: 'center',
        },
    });

    return (
        <TouchableOpacity style={[{ flexDirection: 'column', position: "relative" }]} onPress={() => setShow(false)}>
            <View>
                <TouchableOpacity onPress={toggleDropdown}>
                    <View style={[styles.button, containerStyle]}>
                        <CustomText style={styles.buttonText}>{value}</CustomText>
                        <Animated.View style={{ transform: [{ rotate: positionInterPol }] }} pointerEvents={"none"}>
                            <ChevronIcon />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
                <Modal visible={show} transparent animationType="none">
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ flexGrow: 1 }}
                    >
                        <View
                            style={[
                                {
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
                                listStyle
                            ]}
                        >
                            <FlatList
                                data={list}
                                renderItem={(item) => (
                                    <CustomText
                                        style={[{ height: 40, textAlign: "center", paddingTop: 10 }]}
                                        onPress={() => _onSelect(item.index)}
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
            </View>
        </TouchableOpacity>
    )
}

export default Dropdown;
