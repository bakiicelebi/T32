import { Box, Button } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Buttons = ({ name, onPress }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <Box borderWidth={1} borderColor={"#7f8183"} borderRadius={15} shadow={"9"} flex={1}>
      <Button variant={"unstyled"} borderRadius={15} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }}
        p={1} _pressed={{_text:{fontSize:"md"}}} _text={{ fontSize: "lg", _dark: { color: "white" }, _light: { color: "black" }, fontWeight: "semibold" }} onPress={onPress} flex={1}>{t(name)}</Button>
    </Box>
  )
}

export default Buttons