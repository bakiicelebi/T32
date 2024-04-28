import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native'
import { Box, Center, Icon, Input, Link, Text, FormControl, HStack, NativeBaseProvider, Heading, Button, VStack } from 'native-base';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = [
  {
    id: 1,
    username: 'user1',
    password: 'password1',
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

const Example = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Gecis Yapti")
    }
  }, [isLoggedIn]);

  const checkLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        console.log("Gecis Yapti")
      }
    } catch (error) {
      console.log('Error checking logged in state: ', error);
    }
    console.log("kontrol edildi")
  };

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

export default Example;