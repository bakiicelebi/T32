import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'

const ProfileSection = (props: any) => {

    const firstLetter = props.name ? props.name.charAt(0).toUpperCase() : 'A';
    const firstWord = props.name ? props.name.split(' ')[0].toUpperCase() : 'Anonymus';
    const [showFirstWord, setShowFirstWord] = useState(false);

    useEffect(() => {
        if (props.fullyClosed) {
            setTimeout(() => {
                setShowFirstWord(true)
            }, 150);
        }
        else {
            setTimeout(() => {
                setShowFirstWord(false)
            }, 150);
        }
    }, [props.menuOpen])


    return (
        <View style={{ borderRadius: 10, borderWidth: 2, flex: 1, flexDirection: "row", alignItems: "center" }}>
            {!props.menuOpen && props.fullyClosed && <View style={{ flex: 1, justifyContent: "flex-start" }} >
                <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 40, color: "black", backgroundColor: "yellow", padding: 5, borderRadius: 50 }}> {firstLetter} </Text>
            </View>}
            {props.menuOpen && <View style={{ justifyContent: "flex-start" }} >
                <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 40, color: "black", backgroundColor: "yellow", padding: 5, borderRadius: 50 }}> {firstLetter} </Text>
            </View>}
            {!props.menuOpen && !props.fullyClosed && <View style={{ justifyContent: "flex-start" }} >
                <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 40, color: "black", backgroundColor: "yellow", padding: 5, borderRadius: 50 }}> {firstLetter} </Text>
            </View>
            }
            {showFirstWord && !props.menuOpen && !props.fullyClosed && <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text style={{ fontSize: 25, color: "black" }} numberOfLines={1} ellipsizeMode='tail'>   {firstWord}</Text>
            </View>
            }
            {props.menuOpen && <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text style={{ fontSize: 25, color: "black" }} numberOfLines={1} ellipsizeMode='tail'>   {firstWord}</Text>
            </View>}
        </View>
    );
}

export default ProfileSection;