import { Box, Button, Center, extendTheme, NativeBaseProvider, Text, useColorMode } from "native-base";

function PseudoPropsUsage() {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    return <Center flex={1}>
        <Box p={4} maxW="300" _dark={{
            bg: "coolGray.800"
        }} _light={{
            bg: "warmGray.50"
        }}>
            <Text fontSize="lg" display="flex" mb="20">
                The active color mode is{' '}
                <Text bold fontSize="lg">
                    {colorMode}
                </Text>
            </Text>
            <Button onPress={toggleColorMode}>Toggle</Button>
        </Box>
    </Center>;
}

const Example = () => {
    const config = {
        useSystemColorMode: false,
        initialColorMode: 'light',
    };

    // extend the theme
    const customTheme = extendTheme({ config });

    return <NativeBaseProvider theme={customTheme}>
        <PseudoPropsUsage />
    </NativeBaseProvider>;
};

export default Example;