import { Box, HStack, Text, VStack, Image, Pressable, Modal } from 'native-base';
import React, { memo, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSaleContext } from '../../../context/SaleContext';
import { useCartContext } from '../../../context/CartContext';
import { Alert } from 'react-native';
import { useData } from '../../../context/DataContext';
import LogoLoading from '../../GeneralComponents/LottieComponents/LogoLoading';

const ProductCard = memo(
  ({ item, setIsFavoritesDisplay }: any) => {
    const { selectedSale, openTabs } = useSaleContext();
    const { favorites, addFavorite, removeFavorite } = useData();
    const { refreshCart, cart1, cart2, cart3, cart4, cart5 } = useCartContext();
    const [loading, setLoading] = useState(false); // Add loading state


    const isFavorited = useMemo(() => {
      return favorites.some(favorite => favorite.Barcode === item.Barcode);
    }, [favorites, item.Barcode]);

    const handleAdding = () => {
      const cartNo = openTabs[selectedSale - 1];
      let cart;

      switch (cartNo) {
        case 1:
          cart = cart1;
          break;
        case 2:
          cart = cart2;
          break;
        case 3:
          cart = cart3;
          break;
        case 4:
          cart = cart4;
          break;
        case 5:
          cart = cart5;
          break;
        default:
          return;
      }

      if (!cart.some((cartItem: any) => cartItem === item.Barcode)) {
        refreshCart(cartNo, [item.Barcode]).then(() => console.log(item.ProductName + " added " + cartNo + '. cart'));
      } else {
        Alert.alert("Error", 'Item is already in the cart');
        console.log('Item is already in the cart');
      }
    };

    const handleFavorites = () => {
      if (isFavorited) {
        removeFavorite(item); // Assuming removeFavorite exists in your useData hook
        console.log(item.ProductName + " is removed from Favorites")
        if (setIsFavoritesDisplay) {
          setIsFavoritesDisplay(false)
        }
      } else {
        addFavorite(item); // Assuming addFavorite exists in your useData hook
        console.log(item.ProductName + " is added to Favorites")
      }
    };

    const handleLoading = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }

    return (
      <>
        <Pressable onTouchStart={handleLoading} onTouchMove={() => setLoading(false)} onTouchCancel={() => setLoading(false)} justifyContent={"center"} alignItems={"center"} flex={1} m={6} onLongPress={handleFavorites} onPress={handleAdding}>
          <Box _dark={{
            bg: "#1e1f21",
            borderColor: "#515557",
            borderWidth: .5
          }} _light={{
            bg: "#ffffff"
          }} maxW={200} flex={1} shadow={"7"} p={3} borderRadius={15} >
            <VStack>
              <Image alt={item.ProductName} resizeMode='contain' source={{ uri: item.imageUrl }} borderTopRadius={12} w={150} h={150} />
              <Text fontSize={"lg"} flex={1} textAlign={"center"}>{item.Barcode}</Text>
              <HStack flex={1}>
                <Text numberOfLines={1} ellipsizeMode='tail' pt={2} pb={2} fontSize={"xl"}>{item.ProductName}</Text>
              </HStack>
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={"semibold"} fontSize={"md"} _dark={{ color: "#7f8183" }}>{item.Price} ₺</Text>
                {isFavorited ? (
                  <Icon name="heart" size={20} color="red" />
                ) : (
                  <Icon name="heart-outline" size={20} color="#7f8183" />
                )}
              </HStack>
            </VStack>
          </Box>
        </Pressable>
        <Modal isOpen={loading} onClose={() => { }}>
          <Box borderRadius={15} _dark={{
            bg: "#1e1f21"
          }} _light={{
            bg: "#ffffff"
          }} w={100} h={100}>
            <LogoLoading />
          </Box>
        </Modal>
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.imageUrl === nextProps.item.imageUrl &&
      prevProps.item.Barcode === nextProps.item.Barcode &&
      prevProps.item.ProductName === nextProps.item.ProductName &&
      prevProps.item.Price === nextProps.item.Price;
  }
);

export default memo(ProductCard);
