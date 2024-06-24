import { VStack, HStack, Pressable, Text } from "native-base";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const CustomAccordion = ({ handleAccordion, cartGeneralTotal, cartSubtotal, cartTaxes, cartDiscount, cartTotal, isAccordionOpen }: any) => {

    const { t, i18n } = useTranslation()

    return (
        <VStack borderBottomRadius={15} _dark={{
            bg: "#1e1f21"
        }} _light={{
            bg: "#ffffff"
        }} flex={1} >
            <Pressable flex={1} py={2} px={3} onPress={handleAccordion}>
                <HStack alignItems={"center"} flex={1} >
                    <Text textAlign={"left"} flex={2} fontSize={"xl"}>{t('grand total')}:</Text>
                    <Icon style={{ flex: 1, color: isAccordionOpen ? "red" : "green", alignSelf: "center", textAlign: "center", fontSize: 40 }} name={isAccordionOpen ? 'menu-down' : 'menu-up'} />
                    <Text flex={2} textAlign={"right"} fontSize={"xl"}>{cartGeneralTotal} ₺</Text>
                </HStack>
            </Pressable>
            {isAccordionOpen && <VStack flex={2.5} pb={3} px={3} >
                <HStack justifyContent={"space-between"}>
                    <Text fontSize={"xl"}>{t('subtotal')}:</Text>
                    <Text fontSize={"xl"}>{cartSubtotal} ₺</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                    <Text fontSize={"xl"}>{t('taxes')} {"(18%)"}:</Text>
                    <Text fontSize={"xl"}>{cartTaxes} ₺</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                    <Text fontSize={"xl"}>{t('total')}:</Text>
                    <Text fontSize={"xl"}>{cartTotal} ₺</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                    <Text fontSize={"xl"}>{t('discount')}:</Text>
                    <Text fontSize={"xl"}>{-cartDiscount} ₺</Text>
                </HStack>
            </VStack>}
        </VStack>
    )
}

export default CustomAccordion;
