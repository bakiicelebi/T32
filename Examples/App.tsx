import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, useWindowDimensions, FlatList, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'; // TextInput ekleyin
import { TabView, Route, TabBar } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import data from "./data.json"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface IRoute extends Route {
    key: string;
    title: string;
}

const App = ({ navigation, route }: any) => {
    const [index, setIndex] = useState<number>(route.params.id);
    const [routes, setRoutes] = useState<IRoute[]>(route.params.categories);
    const [categories, setCategories] = useState<any>(route.params.categories);
    const [loading, setLoading] = useState(true);
    const groupedProducts: any = [];
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {


            setLoading(false);
        } catch (error) {
            console.error('Veri almak hatassi:', error);
        }
    };



    const groupProductsByAlphabet = () => {
        const sortedData = data.map(item => ({
            ...item,
            products: item.products.slice().sort()
        }));

        const allProducts = sortedData.reduce((acc, curr) => acc.concat(curr.products), []);

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
                    keyExtractor={(item, index) => item.id.toString()}
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
        {Object.entries(groupedProducts).map(([letter, productList]) => (
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

const Categories = ({ navigation }: any) => {

    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();

    }, []);


    const fetchData = async () => {
        try {

            setCategories([{ key: 'All', title: 'All Products' }, { key: 'search', title: 'Search' }, ...data.map((category) => ({ key: category.id, title: category.name }))]); // Arama sekmesini ekleyin
            setLoading(false);

        } catch (error) {
            console.error('Veri alma hatası:', error);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {categories.map((category: any) => (
                <TouchableOpacity
                    key={category.key}
                    style={styles.categoryTouchable}
                    onPress={() => {
                        console.log("Category pressed:", category.title);
                        navigation.navigate("App", { categories: categories, id: category.key === 'search' ? 1 : category.key === 'All' ? 0 : (parseFloat(category.key) + 1) })
                    }}
                >
                    <Text>{category.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}


const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Categories' component={Categories} />
                <Stack.Screen name='App' component={App} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;






const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
    },
    scene: {
        flex: 1,
    },
    categoryContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
