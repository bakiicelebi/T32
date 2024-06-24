import React from 'react';
import Swiper from 'react-native-swiper';
import { useData } from '../../../context/DataContext';
import { Box, Image, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';

const CampaignsSlider = () => {

  const { campaignsState } = useData()
  const width = useWindowDimensions().width

  return (
    <Swiper showsPagination={false} autoplay autoplayTimeout={5} >
      {campaignsState.map((campaign) => (
        <Box  shadow={"5"} borderRadius={20} style={{marginTop:19}} _dark={{
          bg: "#1e1f21"
      }} _light={{
          bg: "#ffffff"
      }}  key={campaign.id}>
          <Box pt={3} pb={2} alignItems={"center"}  >
            <Image alt='campaignPhoto' w={width / 6} h={width / 6} resizeMode='contain' source={{ uri: campaign.imageUrl }} />
            {campaignsState && <Text fontSize={"2xl"}  >{campaign.name}</Text>}
          </Box>
        </Box>
      ))}
    </Swiper>
  );

}


export default CampaignsSlider;