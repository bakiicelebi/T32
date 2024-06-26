import { Box, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import ButtonsSection from '../ButtonsSection'

const OptionsSection = ({ setMail: setMailComing }: any) => {

    const [mail, setMail] = useState("")
    useEffect(() => { setMailComing(mail) }, [mail])

    return (
        <Box flex={1}>
            <VStack flex={3}>
                <ButtonsSection heading={"T32 card transactions"} names={["T32 card inquiry", "check T32 card balance"]} />
                <ButtonsSection heading={"gift cards"} names={["new T32 card", 'gift card']} />
                <ButtonsSection setMail={setMail} heading={"e-bill"} names={['request e-bill']} />
            </VStack>
            <VStack justifyContent={"center"} flex={1}>
                {mail && <Box borderWidth={1} borderColor={"#7f8183"} borderRadius={15} p={2} shadow={"8"} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }} >
                    <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>Mail</Text>
                    <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>{mail}</Text>
                </Box>}
            </VStack>
        </Box>
    )
}

export default OptionsSection