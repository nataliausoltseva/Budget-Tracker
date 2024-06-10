import { Card, Modal } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode,
    isVisible: boolean,
    onClose: () => void,
    hasOverlay?: boolean,
}

const CustomModal = ({ children, isVisible = false, onClose, hasOverlay = true }: Props) => {
    return (
        <Modal
            visible={isVisible}
            {...hasOverlay && {
                backdropStyle: styles.backdrop
            }}
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