import React, { useEffect, useState } from "react";
import { Portal, Modal, Text } from "react-native-paper";

const HistoryScreenDeleteModal: React.FC<{ showModal: boolean}> = ({ showModal = false }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(showModal);
    }, []);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
      </Portal>
    )
}

export default HistoryScreenDeleteModal;