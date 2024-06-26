import React, { useEffect, useState } from 'react';
import { Box, Center, Icon, Input, Link, Text, FormControl, HStack, NativeBaseProvider, Heading, Button, VStack } from 'native-base';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const { width, height } = Dimensions.get("window");

const Example = () => {
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

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
                <Link _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500"
                }} alignSelf="flex-end" mt="1">
                  Forgot Password?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="indigo">
                Sign in
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