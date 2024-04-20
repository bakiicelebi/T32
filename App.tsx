import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Panel = ({ content, isOpen, onOpen, onClose }:any) => {
  const [translateValue, setTranslateValue] = useState(new Animated.Value(-100));

  const handleOpen = () => {
    Animated.timing(translateValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onOpen();
  };

  const handleClose = () => {
    Animated.timing(translateValue, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onClose();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <Text>Open Panel</Text>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          style={{
            transform: [{ translateX: translateValue }],
            position: 'absolute',
            top: 0,
            left: 0,
            width: 200,
            height: '100%',
            backgroundColor: '#fff',
          }}
        >
          {content}

          <TouchableOpacity onPress={handleClose}>
            <Text>Close Panel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Panel
        content={<Text>Panel Content</Text>}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};

export default App;
