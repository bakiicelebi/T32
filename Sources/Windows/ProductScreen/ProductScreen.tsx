import React, { useEffect, useState } from 'react';
import { Text, useWindowDimensions, FlatList, View, ScrollView, TextInput } from 'react-native'; // TextInput ekleyin
import { TabView, Route, TabBar } from 'react-native-tab-view';
import data from "./data.json";
import styles from "./ProductScreen.style";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { useNavigation, useRoute } from '@react-navigation/native';


interface IRoute extends Route {
    key: string;
    title: string;
}

const ProductScreen = () => {

    const route = useRoute();
    
    const navigation = useNavigation();
    
    const [index, setIndex] = useState<number>(route.params.id);
    const [routes, setRoutes] = useState<IRoute[]>(route.params.categories);
    const [categories, setCategories] = useState<any>(route.params.categories);
    const [loading, setLoading] = useState(true);
    const groupedProducts: any = [];


    const groupProductsByAlphabet = () => {
        const sortedData = data.map(item => ({
            ...item,
            products: item.products.slice().sort()
        }));

        const allProducts = sortedData.reduce((acc, curr: any) => acc.concat(curr.products), []);

        const sortedAllProducts = allProducts.sort();

        return sortedAllProducts;
    };

    const sortedAllProducts = groupProductsByAlphabet()


    const renderItem = ({ item }: any) => (
        <Text>{item.name}</Text>
    );


    const renderScene = ({ route }: { route: IRoute }) => {
        if (route.key === 'search') {
            return (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#999"
                        onChangeText={(text) => console.log(text)}
                    />
                </View>

            );
        }
        else if (route.key === 'All') {
            return (
                <FlatList
                    data={sortedAllProducts}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id.toString()}
                />
            )
        }
        else {
            const category = data.find((cat: any) => cat.id === route.key);
            return (
                <ScrollView style={styles.scene}>
                    <View key={category?.id} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category?.name}</Text>
                        {category?.products.map((product: any) => (
                            <View key={product.id} style={styles.productContainer}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productDescription}>{product.description}</Text>
                                <Text style={styles.productPrice}>Price: ${product.price}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            );
        }
    };

    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex);
    };

    <View>
        {Object.entries(groupedProducts).map(([letter, productList]: any) => (
            <View key={letter}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{letter}</Text>
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={{ marginLeft: 20 }}>{item.name}</Text>
                    )}
                />
            </View>
        ))}
    </View>

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            scrollEnabled
            navigationState={{ routes, index }}
            labelStyle={{ fontSize: 15, fontWeight: "400" }}
            pressColor='#3d3d3f'
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            lazyPreloadDistance={1}
            initialLayout={{ width: useWindowDimensions().width, height: useWindowDimensions().height }}
            lazy={true}
            renderTabBar={renderTabBar}
        />
    );
};

export default ProductScreen