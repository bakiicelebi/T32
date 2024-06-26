import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function Screen({ name }:any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{name}</Text>
    </View>
  );
}

function TabButtons({ tabs }:any) {
  const navigation = useNavigation(); // useNavigation hook'unu kullanarak navigation nesnesine erişim sağla

  return (
    <View style={{ position: 'absolute', flexDirection: "row", top: 20, left: 20 }}>
      {tabs.map((tab:any) => (
        <Button
          key={tab.key}
          title={tab.title}
          // @ts-ignore
          onPress={() => navigation.navigate(tab.key)} // useNavigation hook'u ile navigation nesnesine erişim sağla
        />
      ))}
    </View>
  );
}

export default function App() {
  const [tabs, setTabs] = React.useState([{ key: 'Initial', title: 'Initial' }]);

  const addTab = () => {
    const newKey = `Tab${tabs.length}`;
    const newTitle = `Tab ${tabs.length}`;
    setTabs([...tabs, { key: newKey, title: newTitle }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {tabs.map(tab => (
          <Stack.Screen
            key={tab.key}
            name={tab.key}
            options={{ title: tab.title }}>
            {() => <Screen name={tab.title} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
      <TabButtons tabs={tabs} />
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Button title="Add Tab" onPress={addTab} />
      </View>
    </NavigationContainer>
  );
}
