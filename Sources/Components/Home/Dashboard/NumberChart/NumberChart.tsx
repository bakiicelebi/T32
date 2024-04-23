import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, Button, Easing } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';

const NumberChart = () => {
    const [animateToNumber, setAnimateToNumber] = React.useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateToNumber(571)
        }, 300);

        return () => clearTimeout(timer); // Komponentten çıkıldığında zamanlayıcıyı temizle
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <AnimatedNumbers
                includeComma
                animationDuration={2500}
                easing={Easing.out(Easing.exp)}
                animateToNumber={animateToNumber}
                fontStyle={{ fontSize: 40, fontWeight: '900', color: "#ec986d" }}
            />
            <Text style={{ fontSize: 20, color: "lightgray", fontWeight: "500" }}>
                SALE NUMBER
            </Text>
        </View>
    );
};
export default NumberChart;