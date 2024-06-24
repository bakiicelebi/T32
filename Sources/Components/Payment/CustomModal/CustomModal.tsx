import React, { useEffect } from 'react'
import { Center, Input, Button, Modal, useDisclose } from 'native-base'

const CustomModal = ({ children, button1, button2, header, isOpen, setIsOpen, buttonConfirm }: any) => {

    const {
        onOpen,
        onClose
    } = useDisclose();

    useEffect(() => {
        if (isOpen) {
            onOpen()
        }
        else {
            onClose()
        }
    }, [isOpen])

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleConfirm = () => {
        if (buttonConfirm) {
            buttonConfirm()
        }
        handleClose();
    }

    return (
        <Center>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Center>
                        <Modal.Header fontSize="4xl" fontWeight="bold">
                            {header}
                        </Modal.Header>
                    </Center>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="unstyled" mr="1" onPress={handleClose}>
                            {button1}
                        </Button>
                        <Button colorScheme="primary" onPress={handleConfirm}>
                            {button2}
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}

export default CustomModal;