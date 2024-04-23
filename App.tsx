import { Center, Avatar, NativeBaseProvider, Pressable, Box, FlatList, View, Text } from 'native-base';
import React, { useState } from 'react'

// Örneğin, burada veri kaynağından gelen kişilerin listesini temsil eden bir dizi olsun:
const people = [
  { name: 'AJ', online: false },
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

  const [isShown, setIsShown] = useState(false);
  const [avatarCount, setAvatarCount] = useState(Math.min(people.length, maxAvatarCount));
  const sortedPeople = [...people].sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0));

  const renderAvatars = (people: any, count: any) => {
    const remainingCount = Math.max(0, people.length - count);

    return people.slice(0, count).map((person: any, index: any) => (
      <Avatar ml={-3} key={index} bg="green.500" source={{ uri: "https:/ges.unsplash.com/photo-1607746882042-944635dfe10e?i1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}>
        {person.name}
      </Avatar>
    )).concat(
      remainingCount > 0 && (
        <Avatar ml={-3} flexDirection={"row"} key={count} bg="green.700" >
          +{remainingCount}
        </Avatar>
      )
    );
  };

  const renderPeople = ({ item }: any) => <View style={{ marginHorizontal: 10, flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
    <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
    {item.online && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >Online   </Text>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "green",
        }}
      />
    </View>
    }
    {!item.online && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >Offline   </Text>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "red",
        }}
      />
    </View>}
  </View>


  const showOnlinePeople = () => {
    setIsShown(!isShown);
  }
  return (
    <NativeBaseProvider>
      <Box alignItems={"center"} alignSelf={"center"} w={200} height={150}>
        <Box m={3}>
          <Pressable onPress={showOnlinePeople}>
            <Avatar.Group _avatar={{ size: "lg" }} max={avatarCount + 1}>
              {renderAvatars(sortedPeople, avatarCount)}
            </Avatar.Group>
          </Pressable>
        </Box>
        <Box ml={-2} w={200}>
          {isShown && <Box bg={"amber.200"}>
            <FlatList data={sortedPeople} renderItem={renderPeople} keyExtractor={item => item.name} />
          </Box>}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Example;