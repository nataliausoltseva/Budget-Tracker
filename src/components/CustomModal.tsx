import { Card, Modal } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    children: React.ReactNode,
    isVisible: boolean,
    onClose: () => void,
    hasOverlay?: boolean,
    style?: StyleProp<ViewStyle> | undefined,
}

const CustomModal = ({ children, isVisible = false, onClose, hasOverlay = true, style }: Props) => {
    return (
        <Modal
            visible={isVisible}
            {...hasOverlay && {
                backdropStyle: styles.backdrop
            }}
            style={style}
            onBackdropPress={onClose}
        >
            <Card disabled={true}>
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