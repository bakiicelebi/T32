import { Box, Button, Center, Heading, HStack, Input, Modal, useDisclose } from 'native-base';
import React, { useState } from 'react'
import Buttons from '../Buttons/Buttons';
import CustomModal from '../CustomModal';
import { useTranslation } from 'react-i18next';

const ButtonsSection = (props: any) => {
    const { heading, names = [] } = props;
    
    const { t, i18n } = useTranslation();
    const [mail, setMail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePress = (buttonName: string) => {
        // burayı çeviride dinamikleştir
        if (buttonName === "request e-bill") {
            setIsModalOpen(true)
        }
    }

    const handleConfirm = () => {
        props.setMail(mail)
    }

    return (
        <Box mt={3} flex={1}>
            <Center mb={1}>
                <Heading fontSize={"xl"}>
                    {t(heading)}
                </Heading>
            </Center>
            <HStack space={3} justifyContent={"space-evenly"} flex={1}>
                {names.map((name: string, index: number) => (
                    <Buttons onPress={() => handlePress(name)} key={index} name={name} />
                ))}
            </HStack>
            <CustomModal button1={t('cancel')} button2={t('confirm')} header={t('enter an e-mail address')} buttonConfirm={handleConfirm} isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <Input
                    value={mail}
                    onChangeText={setMail}
                    placeholder={t('enter an e-mail address')}
                    InputRightElement={<Button onPress={() => setMail("")} variant={"outline"} borderWidth={"0"} colorScheme={"secondary"}>{t('clear')}</Button>}
                />
            </CustomModal>
        </Box>
    )
}

export default ButtonsSection;
