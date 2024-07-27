import React, { useContext } from 'react';
import { StyleProp, StyleSheet, ViewStyle, Modal, View, TouchableOpacity } from 'react-native';

import { AppContext } from '../context/AppContext';

type Props = {
    children: React.ReactNode,
    isVisible: boolean,
    onClose: () => void,
    hasOverlay?: boolean,
    style?: StyleProp<ViewStyle> | undefined,
}

const CustomModal = ({ children, isVisible = false, onClose, hasOverlay = true, style }: Props) => {
    const appState = useContext(AppContext);
    return (
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                visible={isVisible}
                {...hasOverlay && {
                    backdropStyle: styles.backdrop
                }}
                style={style}
                onRequestClose={onClose}
            >
                <TouchableOpacity onPress={onClose} style={[styles.centeredView, hasOverlay ? styles.backdrop : []]}>
                    <View style={{ backgroundColor: appState.isDarkMode ? "#33294e" : "white", padding: 20, borderRadius: 8 }}>
                        {children}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(130, 130, 130, 0.7)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});