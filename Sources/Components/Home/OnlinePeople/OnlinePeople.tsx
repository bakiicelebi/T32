import { Center, Avatar, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react'
import { Pressable } from 'react-native'

// Örneğin, burada veri kaynağından gelen kişilerin listesini temsil eden bir dizi olsun:
const people = [
    { name: 'AJ', online: true },
    { name: 'TE', online: false },
    { name: 'JB', online: true },
    { name: 'TS', online: true },
    { name: 'JD', online: false },
    { name: 'RC', online: true },
    { name: 'MH', online: false },
    { name: 'KK', online: true },
    { name: 'LP', online: true },
    { name: 'BK', online: false },
    { name: 'MHA', online: false },
    { name: 'KKA', online: true },
    { name: 'LPS', online: true },
    { name: 'BHF', online: false }
];

// Maksimum avatar sayısını belirleyelim
const maxAvatarCount = 3; // Varsayılan olarak 5 avatar gösterilsin

const Example = () => {
    const [avatarCount, setAvatarCount] = useState(Math.min(people.length, maxAvatarCount));
    const sortedPeople = [...people].sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0));
    const renderAvatars = (people: any, count: any) => {
        const remainingCount = Math.max(0, people.length - count);

        return people.slice(0, count).map((person: any, index: any) => (
            <Pressable onPress={() => (console.log("asdas"))}>
                <Avatar key={index} bg="green.500" source={{ uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?i1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}>
                    {person.name}
                </Avatar>
            </Pressable>
        )).concat(
            remainingCount > 0 && (
                <Pressable onPress={() => (console.log("asdas"))}>
                    <Avatar flexDirection={"row"} key={count} bg="green.500" >
                        +{remainingCount}
                    </Avatar>
                </Pressable>
            )
        );
    };
    return (
        <NativeBaseProvider>
            <Center >

                <Avatar.Group _avatar={{ size: "lg" }} max={avatarCount + 1}>
                    {renderAvatars(sortedPeople, avatarCount)}
                </Avatar.Group>

            </Center>
        </NativeBaseProvider>
    );
};

export default Example;