import React, { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box, HStack, Text, VStack, Skeleton, useColorMode, FlatList } from 'native-base';
import { TabView, TabBar } from 'react-native-tab-view';
import { useRoute } from '@react-navigation/native';
import ProductCard from '../../Components/Products/ProductCard';
import { useData } from '../../context/DataContext';
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';
import { useTranslation } from 'react-i18next';

const ProductScreen = () => {
    const route: any = useRoute()
    const [index, setIndex] = useState<number>(route?.params?.index ?? 0);
    const [routes, setRoutes] = useState(route?.params?.route);
    const [param, setParam] = useState(false)


    const { colorMode } = useColorMode()
    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex);
    };




    useEffect(() => {
        //@ts-ignore
        setParam(route?.params.isInHome)
    }, [route])

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: '#ffab0f' }}
            style={{ backgroundColor: colorMode === "dark" ? "#252526" : "white", padding: 1 }}
            activeColor='#ffab0f'
            navigationState={{ routes, index }}
            labelStyle={{ fontSize: 15, fontWeight: "500", color: colorMode === "light" ? "black" : "lightblue" }}
            pressColor='#3d3d3f'
        />
    );

    const renderScene = ({ route }: any) => {
        return <CategoryProductList routeKey={route.key} />;
    };

    const layout = useWindowDimensions();



    return (
        <Box flex={1}>
            {param && <TopBar />}
            <Box justifyContent={"center"} style={{ marginTop: param ? layout.width / 27 : 0 }} h={param ? layout.height * (0.80) : "full"}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={handleIndexChange}
                    lazyPreloadDistance={1}
                    style={{ backgroundColor: colorMode === "dark" ? "#141615" : "#eff3f6" }}
                    lazy={true}
                    renderTabBar={renderTabBar}
                />
            </Box>
            {param && <BottomBar />}
        </Box>
    );
};

const CategoryProductList = ({ routeKey }: any) => {



    const [data, setData] = useState<any[]>([]);
    const { products } = useData();
    const [loading, setLoading] = useState(true);

    const {t,i18n}= useTranslation()

    const filterProducts = (products: any[], categoryId: any) => {
        return products.filter(product => product.CategoryId === parseInt(categoryId));
    };

    useEffect(() => {
        const filteredProducts = filterProducts(products, routeKey);
        setData(filteredProducts);
        setTimeout(() => setLoading(false), 800);
    }, [products, routeKey]);

    const handleProducts = (barcode: any) => {
        console.log(barcode);
    };

    const renderProducts = useCallback(
        ({ item }: any) => <ProductCard setLoading={setLoading} item={item} />,
        [data]
    );

    const renderSkeleton = () => (<VStack w="25%" margin={5} maxW="25%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
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
        <Box style={{ flex: 1, justifyContent: 'center' }}>
            <HStack px={4} alignItems={"center"} justifyContent={"space-between"} >
                <Text py={1} fontSize={"xl"}>{t('product quantity')}</Text>
                <Text py={1} fontSize={"xl"}>{data.length}</Text>
            </HStack>
            <FlatList
                flex={1}
                numColumns={3}
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={renderProducts}
                initialNumToRender={10}
                maxToRenderPerBatch={30}
                windowSize={15}
                centerContent={true}
                removeClippedSubviews={true}
            />
        </Box>
    );
};

export default ProductScreen;
