import { Box, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import SplashLoading from '../../Components/GeneralComponents/LottieComponents/SplashLoading'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

    const [loading,setLoading]=useState(true)

    const navigation = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            //@ts-ignore
            navigation.replace('LogInScreen');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <Box _dark={{
            bg: "#141615"
        }} _light={{
            bg: "#eff3f6"
        }} flex={1} justifyContent={"center"} >
            <Image alignSelf={"center"} alt='SplashImage' source={require("../../assets/Images/T32_logo.png")} />
            <SplashLoading />
        </Box>
    )
}

export default SplashScreen