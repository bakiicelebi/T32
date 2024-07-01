import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { useData } from '../../../context/DataContext';
import { Box, Image, Pressable, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';
import CustomModal from '../../Payment/CustomModal';
import { useTranslation } from 'react-i18next';

const CampaignsSlider = () => {

  const [desc, setDesc] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { t, i18n } = useTranslation()
  const { campaignsState } = useData()
  const width = useWindowDimensions().width



  return (
    <>
      <Swiper showsPagination={false} autoplay autoplayTimeout={5} >
        {campaignsState.map((campaign) => (
          <Box shadow={"5"} borderRadius={20} style={{ marginTop: 19 }} _dark={{
            bg: "#1e1f21"
          }} _light={{
            bg: "#ffffff"
          }} key={campaign.id}>
            <Pressable onPress={() => {setDesc(campaign.description);setIsOpen(true)}}>
              <Box pt={3} pb={2} alignItems={"center"}  >
                <Image alt='campaignPhoto' w={width / 6} h={width / 6} resizeMode='contain' source={{ uri: campaign.imageUrl }} />
                {campaignsState && <Text fontSize={"2xl"}  >{campaign.name}</Text>}
              </Box>
            </Pressable>
          </Box>
        ))}
      </Swiper>
      <CustomModal button2={t('cancel')} header={t('campaigns')} isOpen={isOpen} setIsOpen={setIsOpen}>
        {desc}
      </CustomModal>
    </>
  );

}

export default CampaignsSlider;