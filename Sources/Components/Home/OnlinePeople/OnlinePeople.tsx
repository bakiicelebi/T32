<<<<<<< HEAD
import { Center, Avatar, NativeBaseProvider, Pressable, Box, FlatList, Text, useDisclose, Modal, Button, HStack } from 'native-base';
import React, { useState } from 'react'
import { useData } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';

const dataImages = [{

  url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}, {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}, {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}];


const maxAvatarCount = 3;

const OnlinePeople = () => {
  const { t, i18n } = useTranslation();
  const { userData }: any = useData()
  const [isShown, setIsShown] = useState(false);
  const [avatarCount, setAvatarCount] = useState(Math.min(userData?.length, maxAvatarCount));
  const sortedPeople = [...userData].sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0));

  const renderAvatars = (user: any, count: any) => {
    const remainingCount = Math.max(0, userData.length - count);

    return user.slice(0, count).map((user: any, index: any) => (
      <Avatar ml={-3} size={42} key={index}  source={{ uri: dataImages[index].url }}>
        {user.name}
      </Avatar>
    )).concat(
      remainingCount > 0 && (
        <Avatar size={"42"} ml={-3} flexDirection={"row"} key={count} _light={{bg:"blueGray.800"}} _dark={{bg:"#515557"}} >
=======
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
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
          +{remainingCount}
        </Avatar>
      )
    );
  };

<<<<<<< HEAD
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const renderPeople = ({ item, index }: any) => <HStack _dark={{
    bg: "#1e1f21"
  }} _light={{
    bg: "#ffffff"
  }} p={5} shadow={"5"} marginBottom={2} my={1} alignItems={"center"} style={{ marginHorizontal: 5, flexDirection: "row", justifyContent: "space-between" }}>
    <Avatar size={"md"}  source={{ uri: dataImages[index].url }}>
      {item.name}
    </Avatar>
    <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
    {item.isOnline && <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >{t('online')}   </Text>
      <Box
=======
  const renderPeople = ({ item }: any) => <View style={{ marginHorizontal: 10, flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
    <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
    {item.online && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >Online   </Text>
      <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "green",
        }}
      />
<<<<<<< HEAD
    </Box>
    }
    {!item.isOnline && <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >{t('offline')}   </Text>
      <Box
=======
    </View>
    }
    {!item.online && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >Offline   </Text>
      <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "red",
        }}
      />
<<<<<<< HEAD
    </Box>}
  </HStack>



  return (

    <Center>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setIsShown(false) }}>
        <Modal.Content w={500}>
          <Modal.CloseButton />
          <Modal.Header fontSize="4xl" fontWeight="bold">
            {t('online cashiers')}
          </Modal.Header>
          <Modal.Body  >
            <Box  _dark={{
            bg: "#141615"
        }} _light={{
            bg: "#eff3f6"
        }}  alignItems={"center"} alignSelf={"center"}>
              <Box w={300}>
                {isShown && <Box  >
                  <FlatList scrollEnabled={false} data={sortedPeople} renderItem={renderPeople} keyExtractor={item => item.name} />
                </Box>}
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="error" onPress={onClose}>
              {t('cancel')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box >
        <Pressable onPress={() => { onOpen(); setIsShown(true) }}>
          <Avatar.Group _avatar={{ size: "lg" }} max={avatarCount + 1}>
            {renderAvatars(sortedPeople, avatarCount)}
          </Avatar.Group>
        </Pressable>
      </Box>
    </Center>


  );
};

export default OnlinePeople;
=======
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
        <Box bg={"blue.300"} ml={-2} w={200}>
          {isShown && <Box bg={"amber.200"}>
            <FlatList data={sortedPeople} renderItem={renderPeople} keyExtractor={item => item.name} />
          </Box>}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Example;
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
