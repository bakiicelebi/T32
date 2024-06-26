import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const Screen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Ekran 1</Text>
  </View>
);


const App = () => {
  const [tabCount, setTabCount] = useState(2); // Başlangıçta 2 sekme var

  const addTab = () => {
    const newTabCount = tabCount + 1;
    setTabCount(newTabCount);
  };

  const renderTabs = () => {
    const tabs = [];
    for (let i = 1; i <= tabCount; i++) {
      tabs.push(<Tab.Screen key={`Screen${i}`} name={`Ekran${i}`} component={(Screen1)} />);
    }
    return tabs;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {renderTabs()}
      </Tab.Navigator>
      <TouchableOpacity onPress={addTab} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Text style={{ fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </NavigationContainer>
  );
};

export default App;
