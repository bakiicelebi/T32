import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      <TextInput />
      <Button
        title="Support ->"
        onPress={() =>
          navigation.navigate('Support')
        }
      />
    </View>
  );
}

function SupportScreen({ navigation }) {
  const [txt, setText] = useState('')
  useEffect(() => {
    return () => {
      console.log('SupportScreen unmounted')
    }
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SupportScreen</Text>
      <TextInput value={txt} onChangeText={setText} />
      <Button
        title="<- Home"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
      <Button
        title="<- Home2"
        onPress={() =>
          navigation.navigate('Home2')
        }
      />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarStyle: { height: 0 } }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Home2" component={HomeScreen} />
        <Tab.Screen name="Support" component={SupportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;