import { useState } from 'react';
import { Box, Text, VStack, NativeBaseProvider, Center, Avatar, Pressable } from 'native-base';


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
  { name: 'BH', online: false }
];

// Maksimum avatar sayısını belirleyelim
const maxAvatarCount = 4; // Varsayılan olarak 4 avatar gösterilsin

function YourComponent() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Çevrimiçi olanları önce göstermek için sıralama yapalım
  const sortedPeople = [...people].sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0));

  const handleGroupClick = (index: any) => {
    if (selectedGroup === index) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(index);
    }
  };

  return (
    <NativeBaseProvider>
      <Center justifyContent={"center"} flex={1} alignItems={"center"}>
        <Avatar.Group _avatar={{ size: "lg" }} max={maxAvatarCount}>
          {sortedPeople.slice(0, maxAvatarCount).map((person, index) => (
            <Pressable key={index} onPress={() => handleGroupClick(index)}>
              <Avatar
                bg={person.online ? "green.500" : "gray.400"}
                source={{ uri: `https://example.com/${person.name}.jpg` }}
              >
                {person.name}
              </Avatar>
            </Pressable>
          ))}
        </Avatar.Group>
        {selectedGroup !== null && (
          <Box >
            <Text fontWeight="bold">Grup Üyeleri</Text>
            <VStack  >
              {sortedPeople.slice(0, maxAvatarCount).map((person, index) => (
                <Box key={index}>
                  <Text>{person.name}</Text>
                  <Text color={person.online ? "green.500" : "gray.400"}>{person.online ? "Çevrimiçi" : "Çevrimdışı"}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Center>
    </NativeBaseProvider>
  );
}

export default YourComponent;
