import { Box, Text, useColorModeValue, VStack } from 'native-base';
import React, { useState, useEffect } from 'react'
import { useData } from '../../../../context/DataContext';
import { useTranslation } from 'react-i18next';


const ProfileSection = (props: any) => {
    const { t, i18n } = useTranslation();
    const { inUser }: any = useData()

    const [showFirstWord, setShowFirstWord] = useState(false);
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        const firstLetter = inUser?.name ? inUser?.name.charAt(0).toUpperCase() : 'A';
        const firstWord = inUser?.name ? inUser?.name.split(' ')[0].toUpperCase() : 'Anonymus';

        setUserName(firstLetter)
        setName(firstWord)
    }, [inUser])

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

    const ProfilePhoto = ({ flex }: any) => {

        return (
            <Box shadow={"8"} _dark={{
                bg: "#292a2c"
            }} _light={{
                bg: "warmGray.100"
            }} borderRadius={50} borderWidth={1} borderColor={"#515557"} padding={4} flex={flex}>
                <Text numberOfLines={1} textAlign={"center"} _dark={{color:"#7f8183"}} fontWeight={"600"} fontSize={40}> {userName} </Text>
            </Box>
        )
    }

    const UserName = () => {
        return (
            <Box flex={1} justifyContent={"flex-end"} >
                <VStack >
                    <Text _dark={{color:"#7f8183"}} fontSize={25} fontWeight={"600"} numberOfLines={1} ellipsizeMode='tail'>   {name}</Text>
                    <Text _dark={{color:"#7f8183"}} fontSize={25} fontWeight={"600"} numberOfLines={1} ellipsizeMode='tail'>   {t('cashier')}: {props.user?.cashierNo ?? "1"}</Text>
                </VStack>
            </Box>
        )
    }
    {/**<View style={{ borderRadius: 10, borderWidth: 2, flex: 1, flexDirection: "row", alignItems: "center" }}>
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
        </View> */}

    return (
        <Box borderRadius={20} mt={4} flex={1} flexDirection={"row"} alignItems={"center"} >
            {!props.menuOpen && props.fullyClosed && <ProfilePhoto flex={1} />}
            {props.menuOpen && <ProfilePhoto flex={0} />}
            {!props.menuOpen && !props.fullyClosed && <ProfilePhoto flex={0} />}
            {showFirstWord && !props.menuOpen && !props.fullyClosed && <UserName />}
            {props.menuOpen && <UserName />}
        </Box>
        
    );
}

export default ProfileSection;