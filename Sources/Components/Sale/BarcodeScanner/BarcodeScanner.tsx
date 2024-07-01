import { useCameraPermission, Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Button, Box, Text } from "native-base";
import BarcodeMask from 'react-native-barcode-mask';
import { useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputWithNumberPad from "../InputWithNumberPad";
import { useNavigation } from "@react-navigation/native";
import Sound from 'react-native-sound';
import ProductCard from "../../Products/ProductCard";
import { useData } from "../../../context/DataContext";
import { useCartContext } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";

Sound.setCategory('Playback'); // for iOS

const playBeepSound = () => {
  const beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }

    // Ses yüklendikten sonra oynatın
    beep.play((success) => {
      if (success) {
        console.log('Successfully finished playing');
      } else {
        console.log('Playback failed due to audio decoding errors');
      }
    });
  });
};

function BarcodeScanner({ forPrice }: any) {
  const device = useCameraDevice('back');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [gotPermission, setGotPermission] = useState(false);
  const [codeValue, setCodeValue] = useState<string | any>(null);
  const [layout, setLayout] = useState(useWindowDimensions());
  const [scannable, setScannable] = useState(true);
  const [matchedProduct, setMatchedProduct] = useState(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const { products } = useData();
  const { handlePieceBarcode } = useCartContext()
  const {t,i18n}= useTranslation()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    } else {
      setGotPermission(true);
    }

    /** Back Button */
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={handleBack} bg={"transparent"}>
          <Icon color={"black"} name={"arrow-left"} size={25} />
        </Button>
      ),
    });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    } else {
      setGotPermission(true);
    }
  }, [hasPermission]);

  useEffect(() => {
    if (codeValue) {
      console.log("Scanned: " + codeValue);
      const product = products.find((p) => p.Barcode === codeValue);
      if (product) {
        setMatchedProduct(product);
        handlePieceBarcode(codeValue)
      } else {
        Alert.alert(t('product not found in the inventory'));
      }
    }
  }, [codeValue, scannable]);

  useEffect(() => {
    if (!scannable) {
      setTimeout(() => {
        setScannable(true);
      }, 2000);
    }
  }, [scannable]);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-8', 'ean-13', 'qr'],
    onCodeScanned: (codes) => {
      if (scannable) {
        setCodeValue(codes[0].value);
        playBeepSound();
        console.log(codes[0].value);
      }
      setScannable(false);
    },
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePress = () => {
    setMatchedProduct(null);
    handlePieceBarcode("")
  };

  if (!gotPermission) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }

  if (device == null) return <Text>Device Not Found</Text>;

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      disabled={!matchedProduct}
      onPress={handlePress}
    >
      <Box flex={1}>
        <Box flex={1}>
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        </Box>
        <BarcodeMask showAnimatedLine={true} height={layout.height / 3} width={layout.width / 3} outerMaskOpacity={0.3} />
        <Box flex={1} right={0} bottom={0} position={"absolute"}>
          {!forPrice && <InputWithNumberPad />}
        </Box>
        {matchedProduct && <Box bottom={0} position={"absolute"}>
          <ProductCard setLoading={setLoading} item={matchedProduct} />
        </Box>}
      </Box>
    </TouchableOpacity>
  );
}

export default BarcodeScanner;
