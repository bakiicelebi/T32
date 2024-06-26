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
          +{remainingCount}
        </Avatar>
      )
    );
  };

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
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "green",
        }}
      />
    </Box>
    }
    {!item.isOnline && <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text >{t('offline')}   </Text>
      <Box
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "red",
        }}
      />
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
