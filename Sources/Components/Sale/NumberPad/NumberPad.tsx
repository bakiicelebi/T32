import { Box, FlatList, Text, Button, useColorMode } from 'native-base'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const NumberPad = ({ onPress, contentXtra }: any) => {
    const numberPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", 0, "X"];
    const {
        colorMode
    } = useColorMode()

    return (
        <FlatList
            data={numberPadContent}
            numColumns={3} // set number of columns
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }: any) => {
                return (
                    <Button m={1} shadow={"2"} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }} variant={"outline"}
                        borderWidth={2} borderRadius={50} colorScheme={"none"} onPress={() => onPress(item)}
                    >
                        <Box justifyContent={"center"} alignItems={"center"}
                            style={[
                                {

                                    margin: 10,
                                    borderRadius: 50,
                                    width: 20,
                                    height: 20,
                                },
                            ]}
                        >
                            {item === "X" ? (
                                <Icon color={colorMode === "dark" ? "#ffffff" : "black"} name='arrow-left' style={{ fontSize: 25 }} />
                            ) :
                                item === "A" ? (<Icon  color={colorMode === "dark" ? "#ffffff" : "black"} name={contentXtra ? "circle-medium" : "check"} style={{ fontSize: 25 }} />) :
                                    (
                                        <Text

                                            style={{ fontWeight: "500", fontSize: 20 }}
                                        >
                                            {item}
                                        </Text>
                                    )}
                        </Box>
                    </Button>
                );
            }}
        />
    )
}

export default NumberPad