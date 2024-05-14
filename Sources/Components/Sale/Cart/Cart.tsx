import { View, Text, Box, Center, VStack, Heading } from 'native-base'
import React from 'react';
import { List } from 'react-native-paper';


const App = () => {

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <VStack flex={1}>
            <Center>
                <Heading>
                    CART
                </Heading>
            </Center>
            <Box flex={1} padding={5} borderWidth={3}>
                <Text>
                    ASSSSS
                </Text>
            </Box>
            <List.Section >
                <List.Accordion title="Uncontrolled Accordion">
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section>
        </VStack>
    )
}

export default App