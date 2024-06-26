import { Center, Actionsheet, Heading, useToast, HStack, Text } from "native-base";
import React from "react";
import { useData } from "../../../context/DataContext";
import { useCartContext } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";

const Campaigns = ({ isOpen, onClose }: any) => {
    const { t, i18n } = useTranslation()
    const { campaignsState: campaigns }: any = useData();
    const { discountInvert, isDiscountApplied } = useCartContext()

    const toast = useToast();
    const discountProcess = () => {
        if (isDiscountApplied) {
            discountInvert()
            console.log("discount removed")
            toast.show({
                description: t('discount removed')
            })
        }
        else {
            discountInvert()
            console.log("discountApplied")
            toast.show({
                description: t('discount applied')
            })
        }

    }




    return (
        <Center>
            <Actionsheet alignSelf={"center"} w={"90%"} isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Heading fontSize={"lg"}>
                        {t('campaigns')}
                    </Heading>
                    {campaigns?.map((campaign: any, index: number) => (
                        <Actionsheet.Item key={index} onPress={() => {
                            if (index === 0) {
                                discountProcess();
                            }
                            onClose();
                        }}><HStack space={50}>
                                <Text>{campaign.name}</Text>
                                {index === 0 && isDiscountApplied && <Text color={"#ea7465"} textAlign={"right"}>{t('campaign applied')}</Text>}
                            </HStack>
                        </Actionsheet.Item>
                    ))}
                    <Actionsheet.Item onPress={onClose}>{t('cancel')}</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>
    );
}

export default Campaigns;
