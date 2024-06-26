import React, { useState } from 'react'
import { Box, Heading, VStack, Input, Center, Pressable } from 'native-base'
import NumberPad from '../../Sale/NumberPad'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next'

const LogInForm = (props: any) => {
    const [isCodeActive, setActiveField] = useState(true)
    const { t, i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false)

    const handleNumberPadPress = (value: string) => {
        if (value === 'X') {
            if (isCodeActive === true) {
                props.setuserCode((prev: any) => prev.slice(0, -1))
            } else if (isCodeActive === false) {
                props.setPassword((prev: any) => prev.slice(0, -1))
            }
        } else if (value === 'A') {
            props.handleLogin()
            props.setPassword('')
        } else {
            if (isCodeActive === true) {
                props.setuserCode((prev: any) => prev + value)
            } else if (isCodeActive === false) {
                props.setPassword((prev: any) => prev + value)
            }
        }
    }

    return (
        <Box   py={"8"} w="90%" maxW={"50%"}>
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                {t('welcome')} 1
            </Heading>
            <Heading px={2} mt="2" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="md">
                {t('sign in to continue')}!
            </Heading>
            {props.loginFailed && <Heading mt="2" _dark={{
                color: "red.400"
            }} color="red.600" fontWeight="medium" size="xs">
                {t('wrong code')} !
            </Heading>}
            <VStack space={4} mt="5">
                <Pressable onPress={() => setActiveField(true)}>
                    <Input
                        borderWidth={2.5}
                        borderColor={isCodeActive ? "green.500" : "black"}
                        mx={4}
                        mt={5}
                        fontSize={"2xl"}
                        padding={1}
                        placeholder={t('user code')}
                        value={props.userCode}
                        editable={false}
                        selectTextOnFocus={false}
                        onChangeText={text => props.setuserCode(text)}
                    />
                </Pressable>
                <Pressable onPress={() => setActiveField(false)}>
                    <Input
                        borderWidth={2.5}
                        borderColor={!isCodeActive ? "green.500" : "black"}
                        mx={4}
                        mt={2}
                        mb={5}
                        fontSize={"2xl"}
                        padding={1}
                        placeholder={t('password')}
                        type={showPassword ? "text" : "password"}
                        value={props.password}
                        editable={false}
                        selectTextOnFocus={false}
                        InputRightElement={<Icon style={{ paddingRight: 8 }} name={showPassword ? 'eye-off' : 'eye'} size={25} onPress={() => setShowPassword(!showPassword)} />}
                        onChangeText={text => props.setPassword(text)}
                    />
                </Pressable>
                <Center>
                    <NumberPad onPress={handleNumberPadPress} />
                </Center>
            </VStack>
        </Box>
    )
}

export default LogInForm
