import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet, Animated, Dimensions, Button, Pressable } from 'react-native';
import styles from "./MenuButtons.style";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

const ProfileDrawer = (props: any) => {

    return (
        <View>
            <Pressable disabled={props.disabled}>
                {props.disabled && <Text ellipsizeMode="clip" style={styles.menuButtonText} numberOfLines={1} >{props.icon}</Text>}
                {!props.disabled && <Text ellipsizeMode="tail" style={styles.menuButtonText} numberOfLines={1} >{props.icon + "- " + props.title}</Text>}
            </Pressable>
        </View>
    );
};

export default ProfileDrawer;