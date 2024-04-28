import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native'
import { Box, Center, Icon, Input, Link, Text, FormControl, HStack, NativeBaseProvider, Heading, Button, VStack } from 'native-base';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import NfcManager, { NfcTech } from 'react-native-nfc-manager';


NfcManager.start();

const initialData = [
    {
        id: 1,
        username: 'user1',
        password: 'pass1',
        name: 'John Doe',
        email: 'john@example.com',
    },
    {
        id: 2,
        username: 'user2',
        password: 'password2',
        name: 'Jane Smith',
        email: 'jane@example.com',
    },
    {
        id: 3,
        username: 'user3',
        password: 'password3',
        name: 'Alice Johnson',
        email: 'alice@example.com',
    },
    {
        id: 4,
        username: 'user4',
        password: 'password4',
        name: 'Bob Brown',
        email: 'bob@example.com',
    },
];

const DismissKeyboard = ({ children }: any) => (
    <TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)



const { width, height } = Dimensions.get("window");

const LogInScreen = ({ navigation }: any) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const rnBiometrics = new ReactNativeBiometrics()
    const [key, setKey] = useState([])

    useEffect(() => {
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("Gecis Yapti")
            navigation.navigate("HomeWindow")
        }
    }, [isLoggedIn]);

    const checkLoggedIn = async () => {
        await AsyncStorage.getAllKeys().then(key => console.log(key))
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData !== null) {
                console.log("Gecis Yapti")
                handleOtherWays();
            }
        } catch (error) {
            console.log('Error checking logged in state: ', error);
        }
        console.log("kontrol edildi")
    };

    const handleOtherWays = async () => {
        const isSupportedBio = await rnBiometrics.isSensorAvailable();
        if (isSupportedBio) {
            handleBiometrics()
        }
        const isSupportedNFC = await NfcManager.isSupported();
        if (isSupportedNFC) {
            handleNFC()
        }
    }

    const handleNFC = async () => {
        try {
            console.log(key)

            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            const { id }: any = tag;
            console.log(tag)
            if (key.length == 0) {
                setKey(id);
                Alert.alert("Ayarlandi")
                console.log(id)
            }
            else if (key == id) {
                console.log("as")
                Alert.alert("Dogru Giris")
                setIsLoggedIn(true)

            }
            else {
                Alert.alert("Yanlis Giris")
            }


        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    const handleBiometrics = async () => {


        try {
            const { success, error } = await rnBiometrics.simplePrompt({
                promptMessage: 'Biyometrik kimlik',
            });
            if (success) {
                // Başarılı doğrulama durumunda burada işlemleri gerçekleştirin
                console.log('Biyometrik kimlik doğrulaması başarılı');
                setIsLoggedIn(true)
            } else {
                // Hata durumunda veya kullanıcı iptal ederse burada uygun işlemleri yapın
                console.error('Biyometrik kimlik doğrulaması başarısız', error);
            }
        } catch (error) {
            console.error('Bir hata oluştu', error);
        }
    }

    const handleLogin = async () => {
        setLoading(true);
        const user = initialData.find(u => u.username === username && u.password === password);

        if (user) {
            try {
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                console.log("giris yapildi.")
                setLoading(false);
                setIsLoggedIn(true)
            } catch (error) {
                console.log('Error saving user data: ', error);
                setLoading(false);
            }
        } else {
            Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış.');
            setLoading(false)
        }
    };

    const handleLogout = async () => {
        setLoading(true)
        try {
            await AsyncStorage.removeItem('userData');
            console.log("cikis Yapildi")
            setIsLoggedIn(false);
        } catch (error) {
            console.log('Error logging out: ', error);
        }
        setLoading(false)
    };

    return <NativeBaseProvider>
        <DismissKeyboard>
            <HStack flex={1}>
                <Center flex={1}>
                    <Text>WELCOME</Text>
                </Center>
                <Center flex={1} w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Welcome
                        </Heading>
                        <Heading mt="2" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            Sign in to continue!
                        </Heading>
                        <VStack space={4} mt="5">
                            <FormControl >
                                <Input placeholder='Username' onChangeText={text => setUsername(text)} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Password' type="password" onChangeText={text => setPassword(text)} />
                                <Link _text={{
                                    fontSize: "xs",
                                    fontWeight: "500",
                                    color: "indigo.500"
                                }} alignSelf="flex-end" mt="1">
                                    Forgot Password?
                                </Link>
                            </FormControl>
                            <Button isLoading={loading} isLoadingText="Signing In" onPress={handleLogin} mt="2" colorScheme="indigo">
                                Sign in
                            </Button>
                            <Button isLoading={loading} isLoadingText="Signing In" onPress={handleLogout} mt="2" colorScheme="indigo">
                                Sign Out
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    I'm a new user.{" "}
                                </Text>
                                <Link _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm"
                                }} href="#">
                                    Sign Up
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </HStack>
        </DismissKeyboard>
    </NativeBaseProvider>;
};

export default LogInScreen;