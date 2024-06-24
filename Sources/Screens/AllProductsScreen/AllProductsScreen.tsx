import { Box, Center, FlatList, Heading, HStack, Text, Button, Input, VStack, Skeleton, useColorMode } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../Components/Products/ProductCard';
import { ActivityIndicator, LogBox } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

LogBox.ignoreLogs([
  "ReactImageView: Image source \"null\" doesn't exist",
  "Please pass alt prop to Image component"
]);



const AllProductsScreen = () => {

  const [data, setData] = useState([]);
  const [isFavoritesDisplay, setIsFavoritesDisplay] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const [sortState, setSortState] = useState(0); // 0: original, 1: A-Z, 2: Z-A
  const [searchQuery, setSearchQuery] = useState("");
  const { products, favorites }: any = useData();
  const [param, setParam] = useState(false)

  const originalData = React.useRef([]);
  const route = useRoute()
  const { colorMode } = useColorMode()
  const {t,i18n}= useTranslation()

  useEffect(() => {
    //@ts-ignore
    setParam(route?.params.isInHome)
  }, [route])

  useEffect(() => {
    setData(products);
    originalData.current = products;

  }, [products]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800);
  }, [])

  useEffect(() => {
    if (isFavoritesDisplay) {
      setData(favorites);
    } else {
      filterAndSortData(searchQuery);
    }
  }, [isFavoritesDisplay]);

  useEffect(() => {
    filterAndSortData(searchQuery);
  }, [searchQuery, sortState]);

  const filterAndSortData = (query: string) => {
    let filteredData = (isFavoritesDisplay ? favorites : originalData.current).filter((item: any) =>
      item.ProductName.toLowerCase().includes(query.toLowerCase()) ||
      item.CategoryId.toString().includes(query)
    );

    let sortedData;
    switch (sortState) {
      case 1:
        sortedData = [...filteredData].sort((a: any, b: any) => a.ProductName.localeCompare(b.ProductName));
        break;
      case 2:
        sortedData = [...filteredData].sort((a: any, b: any) => b.ProductName.localeCompare(a.ProductName));
        break;
      default:
        sortedData = filteredData;
    }
    setData(sortedData);
  };

  const cycleSortState = () => {
    setSortState((prevState) => (prevState + 1) % 3);
  };

  const handleFavorites = () => {
    setIsFavoritesDisplay(!isFavoritesDisplay);
  };

  const renderProducts = ({ item }: any) => <ProductCard setIsFavoritesDisplay={setIsFavoritesDisplay} item={item} />;

  const renderItem = useCallback(({ item }: any) => renderProducts({ item }), [data]);

  const renderSkeleton = () => (<VStack  w="25%" margin={5} maxW="25%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
    borderColor: "coolGray.600"
  }} _light={{
    borderColor: "coolGray.300"
  }}>
    <Skeleton h="40" />
    <Skeleton.Text px="4" />
    <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
  </VStack>)

  if (loading) {
    return (
      <Box 
      _dark={{
        bg: "#141615"
      }} _light={{
        bg: "#eff3f6"
      }}
      >
        <FlatList numColumns={3} data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} renderItem={renderSkeleton} />

      </Box>
    );
  }

  return (
    <Box flex={1}
      _dark={{
        bg: "#141615"
      }} _light={{
        bg: "#eff3f6"
      }} >
      {param && <TopBar />}
      <Box h={param ? "100%" : "125%"} top={param ? 12 : 0} justifyContent={"center"}>
        {loading && <ActivityIndicator />}
        {!data.length && !isFavoritesDisplay && <ActivityIndicator size={"large"} />}
        <HStack pb={1} pt={1} px={4} alignItems={"center"} >
          <Text flex={1} fontWeight={"700"} fontSize={20}>{t('products')}: {data.length}</Text>
          <Heading textAlign={"center"} flex={2}>{isFavoritesDisplay ? t("favorites") : t("All Products")}</Heading>
          <HStack alignItems={"center"} space={10} justifyContent={"flex-end"} flex={1}>
            {isFavoritesDisplay ? (
              <Icon name="heart" size={25} color="red" onPress={handleFavorites} />
            ) : (
              <Icon name="heart-outline" size={25} color={colorMode === "dark" ? "#7f8183" : "black"} onPress={handleFavorites} />
            )}
            <Button variant={'outline'} onPress={cycleSortState}>
              {sortState === 0 && <HStack alignItems={"center"}><Text fontSize={20}>A-Z </Text><Icon size={20} name='arrow-down' color={colorMode==="dark"? "#7f8183": "black"} /></HStack>}
              {sortState === 1 && <HStack alignItems={"center"}><Text fontSize={20}>Z-A </Text><Icon size={20} name='arrow-down' color={colorMode==="dark"? "#7f8183": "black"} /></HStack>}
              {sortState === 2 && <HStack alignItems={"center"}><Text fontSize={20}>{t('default')} </Text><Icon size={20} name='arrow-down' color={colorMode==="dark"? "#7f8183": "black"} /></HStack>}
            </Button>
          </HStack>
        </HStack>
        <HStack px={4} pb={2}>
          <Input
            placeholder={t("search by name or category id")}
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            variant="outline"
            width="100%"
          />
        </HStack>
        <FlatList
          mb={100}
          numColumns={3}
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={30}
          windowSize={15}
          removeClippedSubviews={true}
        />
      </Box>
      {param && <BottomBar />}
    </Box >
  );
};

export default AllProductsScreen;
