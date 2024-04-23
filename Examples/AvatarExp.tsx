import { Center, Avatar, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react'

// Örneğin, burada veri kaynağından gelen kişilerin listesini temsil eden bir dizi olsun:
const people = ['AJ', 'TE', 'JB', 'TS','AJ', 'TE', 'JB', 'TS'];

// Maksimum avatar sayısını belirleyelim
const maxAvatarCount = 5; // Varsayılan olarak 4 avatar gösterilsin

const Example = () => {
  const [avatarCount, setAvatarCount] = useState(Math.min(people.length, maxAvatarCount));

  return (


    <NativeBaseProvider>
      <Center>
        <Avatar.Group _avatar={{ size: "lg" }} max={avatarCount}>
          {people.slice(0, avatarCount).map((person, index) => (
            <Avatar key={index} bg="green.500" source={{ uri: `https://example.com/${person}.jpg` }}>
              {person}
            </Avatar>
          ))}
        </Avatar.Group>
      </Center>
    </NativeBaseProvider>
  );
};

export default Example;