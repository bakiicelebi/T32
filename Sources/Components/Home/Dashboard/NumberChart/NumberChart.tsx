import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { Animated, View, Button, Easing } from 'react-native';
import { Box, Text } from 'native-base';
import AnimatedNumbers from 'react-native-animated-numbers';
import { useTranslation } from 'react-i18next';

const NumberChart = ({ type }: any) => {
    const [animateToNumber, setAnimateToNumber] = React.useState(0);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (type) {
                setAnimateToNumber(571)
            }
            else {
                setAnimateToNumber(1401)
            }
        }, 800);
=======
import { Animated, Text, View, Button, Easing } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';

const NumberChart = () => {
    const [animateToNumber, setAnimateToNumber] = React.useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateToNumber(571)
        }, 300);
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a

        return () => clearTimeout(timer); // Komponentten çıkıldığında zamanlayıcıyı temizle
    }, []);

    return (
<<<<<<< HEAD
        <Box
=======
        <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <AnimatedNumbers
                includeComma
                animationDuration={2500}
                easing={Easing.out(Easing.exp)}
                animateToNumber={animateToNumber}
<<<<<<< HEAD
                fontStyle={{ fontSize: 35, fontWeight: '900', color: "#ea7465" }}
            />
            <Text _dark={{ color: "#a0a1a1" }} fontSize={"xl"} >
                {type ? t("sale number") : t("total") + " " + t('product')}
            </Text>
        </Box>
=======
                fontStyle={{ fontSize: 40, fontWeight: '900', color: "#ec986d" }}
            />
            <Text style={{ fontSize: 20, color: "lightgray", fontWeight: "500" }}>
                SALE NUMBER
            </Text>
        </View>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    );
};
export default NumberChart;