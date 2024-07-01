import { Box, Input, Button, useColorMode, Modal, Text } from 'native-base';
import { Alert } from 'react-native'
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSaleContext } from '../../../context/SaleContext';
import { useCartContext } from '../../../context/CartContext';
import { useData } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LogoLoading from '../../GeneralComponents/LottieComponents/LogoLoading';
import { API_BASE_URL } from '@env';
import { useMarket } from '../../../context/MarketContext';

const BarcodeInput = ({ handleInputClick: handleCameraClick, setKeyboardDisabled }: any) => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);

  const { openTabs, selectedSale } = useSaleContext();
  const { refreshCart, cart1, cart2, cart3, cart4, cart5, addCart1, addCart2, addCart3, addCart4, addCart5, clearCart } = useCartContext();
  const { products } = useData();
  const { serverStatus } = useMarket()
  const { t, i18n } = useTranslation()

  const {
    colorMode
  } = useColorMode()
  const handleAdding = async () => {
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

    if (barcode.startsWith('**')) {
      if (serverStatus) {
        setLoading(true);
        try {
          const id = barcode.substring(2);
          const response = await axios.get(`${API_BASE_URL}pool`, { timeout: 4000 });
          const incomingValues = response.data

          const pool = incomingValues.find((pool: any) => pool.id === parseInt(id, 10));

          console.log(pool)
          if (pool) {
            clearCart(cartNo);
            refreshCart(cartNo, pool.items).then(() => setLoading(false))
            console.log(`Cart ${cartNo} updated with items from pool ${id}`);
          } else {
            Alert.alert(t("error"), t("product not found in the inventory"));
            console.log(`No items found for the given pool ID: ${id}`);
          }
        } catch (error) {
          Alert.alert(t("error"), t("offline status"));
          console.log("API request failed", error);
        } finally {
          setLoading(false);
        }
      }
      else {
        Alert.alert(t('error'), t('offline status'))
      }
    }
    else if (barcode.startsWith('##')) {
      if (serverStatus) {
        if (cart.length) {
          const id = barcode.substring(2);
          setLoading(true);
          const postingData = {
            id:id,
            items: cart
          }
          console.log("posted: ")
          console.log(postingData)
          try {
            await axios.post(`${API_BASE_URL}pool`, {data:postingData}, { timeout: 4000 });
          } catch (error) {
            Alert.alert(t("error"), t("offline status"));
            console.log("API request failed", error);
          } finally {
            setLoading(false);
          }
        }
        else {
          Alert.alert(t('error'), t('cart is empty'))
        }
      }
      else {
        Alert.alert(t('error'), t('offline status'))
      }
    }
    else {
      const product = products.find(item => item.Barcode === barcode);

      if (product) {
        if (!cart.some(cartItem => cartItem === product.Barcode)) {
          addCartFunction(product.Barcode);
          console.log(`Product ${product.Barcode} added to cart ${cartNo}`);
        } else {
          Alert.alert(t('error'), t('Item is already in the cart'));
          console.log('Item is already in the cart');
        }
      } else {
        Alert.alert(t("error"), t("Product not found in the inventory"));
        console.log("Product not found in the inventory");
      }
    }
  };

  return (
    <>
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
      <Modal isOpen={loading} onClose={() => { }}>
        <Box borderRadius={15} _dark={{
          bg: "#1e1f21"
        }} _light={{
          bg: "#ffffff"
        }} w={130} h={130}>
          <LogoLoading />
          <Text fontWeight={"semibold"} fontSize={"lg"} textAlign={"center"}>Please Wait...</Text>
        </Box>
      </Modal></>
  );
};

export default BarcodeInput;
