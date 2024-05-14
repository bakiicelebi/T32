import { TouchableOpacity, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react'
import data from "./data.json"
import { useNavigation, useNavigationState, useRoute, } from '@react-navigation/native';


const Categories = () => {

    const navigation = useNavigation()

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
                    onPress={() => {
                        console.log("Category pressed:", category.title);
                        // @ts-ignore
                        navigation.navigate("ProductScreen", { categories: categories, id: category.key === 'search' ? 1 : category.key === 'All' ? 0 : (parseFloat(category.key) + 1) })
                    }}
                >
                    <Text>{category.title}</Text>
                </TouchableOpacity>
            ))
            }
        </View >
    )
}

export default Categories;