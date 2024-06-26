import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, Button,Easing } from 'react-native';

import AnimatedNumbers from 'react-native-animated-numbers';

const App = () => {
  const [animateToNumber, setAnimateToNumber] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateToNumber(571)
    }, 700); 

    return () => clearTimeout(timer); // Komponentten çıkıldığında zamanlayıcıyı temizle
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <AnimatedNumbers
        includeComma
        animationDuration={1500}
        easing={Easing.out(Easing.exp)}
        
        animateToNumber={animateToNumber}
        fontStyle={{ fontSize: 50, fontWeight: 'bold' }}
      />
    </View>
  );
};
export default App;