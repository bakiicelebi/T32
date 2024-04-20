import React from 'react'
import { View, Image, Text } from 'react-native'

const ProfileSection = (props: any) => {

    const firstLetter = props.name ? props.name.charAt(0).toUpperCase() : 'B';
    
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!props.menuOpen &&
                <View >
                    <Text numberOfLines={1} ellipsizeMode='clip' style={{ textAlign: "center", fontSize: 40, color: "black", backgroundColor: "yellow", padding: 5, borderRadius: 50 }}> {firstLetter} </Text>
                </View>
            }
            {props.menuOpen &&
                <View >
                    <Text numberOfLines={1} ellipsizeMode='clip' style={{ fontSize: 40, color: "black", backgroundColor: "yellow", padding: 5, borderRadius: 50 }}> A </Text>
                </View>
            }
            {props.menuOpen &&
                <View>
                    <Text style={{ fontSize: 25, color: "black" }} numberOfLines={1} ellipsizeMode='tail'>   {props.name}</Text>
                </View>
            }
        </View>
    );
}

export default ProfileSection;