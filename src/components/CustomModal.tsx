import { Card, Modal } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
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
        <Modal
            visible={isVisible}
            {...hasOverlay && {
                backdropStyle: styles.backdrop
            }}
            style={style}
            onBackdropPress={onClose}
        >
            <Card disabled={true} style={{ backgroundColor: appState.isDarkMode ? "#33294e" : "white" }}>
                {children}
            </Card>
        </Modal>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});