import { StyleSheet, Dimensions } from "react-native";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
    menu: {
        backgroundColor: 'green',
        alignSelf: "center",
        height: height * 0.8,
        borderRadius: 25,
        paddingHorizontal: 10,
        zIndex: 1,
        justifyContent: 'center',
    },
    menuButton: {
        paddingHorizontal: 10,
    },
    menuButtonText: {
        paddingLeft:10
    },
})