import { StyleSheet, Dimensions } from "react-native";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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

    },
    menuButton: {
        paddingHorizontal: 10,
    },
    menuButtonText: {
        fontSize: 24,
    },
})