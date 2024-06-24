import { Box, Pressable } from "native-base";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'



const SwipeableCards = ({ children, type, handleDeleting }: any) => {

    const renderRightActions = () => {
        if (type === "delete") {
            return <Box borderTopRightRadius={10} borderBottomRightRadius={10} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "red", width: 75 }}>
                <Pressable onPress={handleDeleting}>
                    <MaterialCommunityIcons size={25} name='delete' />
                </Pressable>
            </Box>
        }
    }

    return (
        <GestureHandlerRootView >
            <Box  borderRadius={15} style={{backgroundColor:"red"}} shadow={"6"} m={2} >
                <Swipeable overshootRight={false}  renderRightActions={renderRightActions}>
                    {children}
                </Swipeable>
            </Box>
        </GestureHandlerRootView>
    )

}

export default SwipeableCards;