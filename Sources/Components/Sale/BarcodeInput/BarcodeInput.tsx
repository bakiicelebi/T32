import { Box, Input, Button, useColorMode } from 'native-base';
import { Alert } from 'react-native'
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSaleContext } from '../../../context/SaleContext';
import { useCartContext } from '../../../context/CartContext';
import { useData } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';

const BarcodeInput = ({ handleInputClick: handleCameraClick, setKeyboardDisabled }: any) => {
  const [barcode, setBarcode] = useState("");
  const { openTabs, selectedSale } = useSaleContext();
  const { cart1, cart2, cart3, cart4, cart5, addCart1, addCart2, addCart3, addCart4, addCart5 } = useCartContext();
  const { products } = useData();
  const { t, i18n } = useTranslation()

  const {
    colorMode
  } = useColorMode()

  const handleAdding = () => {
    const cartNo = openTabs[selectedSale - 1];
    let cart;
    let addCartFunction;

    switch (cartNo) {
      case 1:
        cart = cart1;
        addCartFunction = addCart1;
        break;
      case 2:
        cart = cart2;
        addCartFunction = addCart2;
        break;
      case 3:
        cart = cart3;
        addCartFunction = addCart3;
        break;
      case 4:
        cart = cart4;
        addCartFunction = addCart4;
        break;
      case 5:
        cart = cart5;
        addCartFunction = addCart5;
        break;
      default:
        return;
    }

    const product = products.find(item => item.Barcode === barcode);

    if (product) {
      if (!cart.some(cartItem => cartItem === product.Barcode)) {
        addCartFunction(product.Barcode);
        console.log(`${cartNo} cart was added`);
      } else {
        Alert.alert(t('error'), t('item is already in the cart'));
        console.log('Item is already in the cart');
      }
    } else {
      Alert.alert(t("error"), t("product not found in the inventory"));
      console.log("Product not found in the inventory")
    }
  };

  return (
    <Box alignItems="center">
      <Input
        borderRadius={10}
        borderWidth={2}
        w="90%"
        py={2}
        marginTop={4}
        value={barcode}
        onChangeText={setBarcode}
        InputRightElement={
          <Button borderWidth={0} variant={"outline"} onPress={handleAdding}>
            <Icon style={{ color: "green" }} size={25} name={"check"} />
          </Button>
        }
        InputLeftElement={
          <Button borderWidth={0} variant={"outline"} onPress={handleCameraClick}>
            <Icon color={colorMode === "dark" ? "#7f8183" : "black"} size={25} name={"camera"} />
          </Button>
        }
        keyboardType='numeric'
        placeholder={t('barcode number')}
      />
    </Box>
  );
};

export default BarcodeInput;
