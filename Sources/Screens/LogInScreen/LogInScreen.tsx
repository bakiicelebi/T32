import React, { useEffect, useState } from 'react';
import { Box, Center, HStack, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import DismissKeyboard from '../../Components/LogIn/DismissKeyboard';
import LogInForm from '../../Components/LogIn/LogInForm';
import { useData } from '../../context/DataContext';
import { useMarket } from '../../context/MarketContext'; // Make sure this is the correct path
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const images: any = {
    en: require('../../assets/Images/Login_en.png'),
    tr: require('../../assets/Images/Login_tr.png'),
    de: require('../../assets/Images/Login_de.png')
};

const LogInScreen = ({ navigation }: any) => {
    const [userCode, setuserCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState<any[]>([])
    const [lang, setLang] = useState("")
    const imageSource = images[lang];


    const rnBiometrics = new ReactNativeBiometrics();

    const { t, i18n } = useTranslation()
    const { userData, addUser }: any = useData();
    const { addWrongLogin } = useMarket();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("Navigate Handled");
            navigation.navigate("HomeScreen", { wrongAttempts: wrongAttempts });
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
            setLang(i18next.language)

    }, [i18next.language])


    const checkLoggedIn = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData !== null) {
                handleOtherWays();
            }
        } catch (error) {
            console.log('Error checking logged in state: ', error);
        }
    };

    const handleOtherWays = async () => {
        const isSupportedBio = await rnBiometrics.isSensorAvailable();
        if (isSupportedBio) {
            handleBiometrics();
        }
    };

    const handleWrongLogIn = async (attemptMessage: string) => {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const loginAttempt = {
            userCode,
            password,
            date: now.toISOString().split('T')[0],
            time: time,
            reason: attemptMessage
        };

        setWrongAttempts(prev => [...prev, loginAttempt]);

        await addWrongLogin(loginAttempt);

        console.log("Wrong login attempt saved:", attemptMessage);
    };


    const handleBiometrics = async () => {
        try {
            const { success, error } = await rnBiometrics.simplePrompt({
                promptMessage: 'Biometrics',
            });
            if (success) {
                console.log('Biometrics succeeded');
                setIsLoggedIn(true);
            } else {
                console.error('Biometrics failed', error);
                handleWrongLogIn(t('fingerprint error'));
            }
        } catch (error) {
            console.log('Biometrics error:', error);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        const user = userData.find((u: any) => u.userCode === parseFloat(userCode) && u.password === parseFloat(password));
        if (user) {
            try {
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                console.log("Logged in.");
                addUser();
                setLoading(false);
                setIsLoggedIn(true);
                setLoginFailed(false);
            } catch (error) {
                console.log('Error saving user data: ', error);
                setLoading(false);
            }
        } else {
            setLoginFailed(true);
            handleWrongLogIn(t('wrong code'));
            setLoading(false);
        }
    };

    return (
        <Box _dark={{ bg: "#141615" }} _light={{ bg: "#eff3f6" }} flex={1}>
            <DismissKeyboard>
                <HStack flex={1}>
                    <Box alignItems={"center"} justifyContent={"center"} flex={1}>
                        <Center>
                            {lang.length && <Image resizeMode='contain' w={500} h={500} alt='LoginPng' source={imageSource} />}
                        </Center>
                    </Box>
                    <Center flex={1} w="100%">
                        <LogInForm
                            handleWrongLogIn={handleWrongLogIn}
                            userCode={userCode}
                            password={password}
                            setuserCode={setuserCode}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                            loading={loading}
                            loginFailed={loginFailed}
                        />
                    </Center>
                </HStack>
            </DismissKeyboard>
        </Box>
    );
};

export default LogInScreen;
