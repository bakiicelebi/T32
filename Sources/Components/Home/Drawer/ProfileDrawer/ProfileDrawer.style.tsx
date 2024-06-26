import { StyleSheet, Dimensions } from "react-native";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
<<<<<<< HEAD
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    menu: {
        backgroundColor: "gray",
        alignSelf: "center",
        height: height * 0.7,
        borderRadius: 15,
        marginLeft: 15,
        zIndex: 100,
        justifyContent: 'center',

=======
        backgroundColor: 'blue',
        zIndex:1,
    },
    menu: {
        backgroundColor: 'green',
        alignSelf: "center",
        height: height * 0.8,
        marginLeft: 15,
        borderRadius: 25,
        paddingHorizontal: 10,
        zIndex: 1,
        justifyContent: 'center',
        
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    },
    menuButton: {
        paddingHorizontal: 10,
    },
    menuButtonText: {
        fontSize: 24,
    },
})