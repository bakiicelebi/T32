import React from 'react'
import { Box, Button, Text, useColorMode } from 'native-base'
import BarcodeScanner from '../BarcodeScanner'
import { TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';


const BarcodeScreen = ({ setIsOpen, forPrice }: any) => {

    const { t, i18n } = useTranslation()
    const handleClick = () => {
        setIsOpen(false)
    }
    const {
        colorMode
    }: any = useColorMode()

    return (
        <Box borderRadius={15} borderWidth={5} shadow={"8"} zIndex={100} top={"10%"} height={"80%"} w={"80%"} justifyContent={"center"} alignSelf={"center"} position={"absolute"}>
            <TouchableWithoutFeedback onPress={handleClick} style={{ backgroundColor: "yellow", height: useWindowDimensions().height, width: useWindowDimensions().width, }}>
                <BlurView
                    style={{
                        position: "absolute",
                        zIndex: -1,
                        top: -100,
                        left: -1000,
                        bottom: -100,
                        right: 0,
                        height: 3000,
                        width: 3000,
                    }}
                    blurType={colorMode}  // Values = dark, light, xlight .
                    blurAmount={8}
                    // viewRef={this.state.viewRef}
                    reducedTransparencyFallbackColor="white"
                />
            </TouchableWithoutFeedback>
            <Button onPress={handleClick} ><Text >{t('cancel')}</Text></Button>
            <BarcodeScanner forPrice={forPrice} />
        </Box>


    )
}

export default BarcodeScreen

