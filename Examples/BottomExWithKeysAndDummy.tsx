import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);

  const fetchData = async () => {
    // Simulated data fetching
    // Group products by alphabet
    const groupedProducts = groupProductsByAlphabet(data);
    setProducts(groupedProducts);
  };

  const fetchProducts = async () => {
    // Simulated data fetching (replace with actual API call)
    return [
      // Sample data
    ];
  };

  const groupProductsByAlphabet = (products) => {
    const groupedProducts = {};
    products.forEach(product => {
      const firstLetter = product.name[0].toUpperCase();
      if (!groupedProducts[firstLetter]) {
        groupedProducts[firstLetter] = [];
      }
      groupedProducts[firstLetter].push(product);
    });
    return groupedProducts;
  };

  const searchProducts = (query) => {
    const filteredProducts = {};
    Object.keys(products).forEach(letter => {
      const filtered = products[letter].filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        filteredProducts[letter] = filtered;
      }
    });
    return filteredProducts;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
      {Object.keys(products).map(letter => (
        <Tab.Screen key={letter} name={letter}>
          {() => (
            <ScrollView>
              {products[letter].map(product => (
                <Text key={product.id}>{product.name}</Text>
              ))}
            </ScrollView>
          )}
        </Tab.Screen>
      ))}
      <Tab.Screen name="Search">
        {() => (
          <ScrollView>
            {Object.keys(searchProducts(query)).map(letter => (
              <View key={letter}>
                <Text>{letter}</Text>
                {searchProducts(query)[letter].map(product => (
                  <Text key={product.id}>{product.name}</Text>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
      </Tab.Screen>
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ProductListScreen;


const data = [
  { "id": 1, "name": "Apple" },
  { "id": 2, "name": "Apricot" },
  { "id": 3, "name": "Avocado" },
  { "id": 4, "name": "Almond" },
  { "id": 5, "name": "Acai" },
  { "id": 6, "name": "Banana" },
  { "id": 7, "name": "Blackberry" },
  { "id": 8, "name": "Blueberry" },
  { "id": 9, "name": "Boysenberry" },
  { "id": 10, "name": "Bilberry" },
  { "id": 11, "name": "Carrot" },
  { "id": 12, "name": "Cabbage" },
  { "id": 13, "name": "Cauliflower" },
  { "id": 14, "name": "Celery" },
  { "id": 15, "name": "Cucumber" },
  { "id": 16, "name": "Date" },
  { "id": 17, "name": "Dragonfruit" },
  { "id": 18, "name": "Durian" },
  { "id": 19, "name": "Date Plum" },
  { "id": 20, "name": "Eggplant" },
  { "id": 21, "name": "Endive" },
  { "id": 22, "name": "Elderberry" },
  { "id": 23, "name": "Fig" },
  { "id": 24, "name": "Fennel" },
  { "id": 25, "name": "Fava Bean" },
  { "id": 26, "name": "Garlic" },
  { "id": 27, "name": "Ginger" },
  { "id": 28, "name": "Grapefruit" },
  { "id": 29, "name": "Grapes" },
  { "id": 30, "name": "Gooseberry" },
  { "id": 31, "name": "Honeydew Melon" },
  { "id": 32, "name": "Horned Melon" },
  { "id": 33, "name": "Huckleberry" },
  { "id": 34, "name": "Jujube" },
  { "id": 35, "name": "Jackfruit" },
  { "id": 36, "name": "Juniper Berry" },
  { "id": 37, "name": "Kiwano" },
  { "id": 38, "name": "Kiwi" },
  { "id": 39, "name": "Kohlrabi" },
  { "id": 40, "name": "Kumquat" },
  { "id": 41, "name": "Lemon" },
  { "id": 42, "name": "Lime" },
  { "id": 43, "name": "Lychee" },
  { "id": 44, "name": "Loquat" },
  { "id": 45, "name": "Mulberry" },
  { "id": 46, "name": "Mango" },
  { "id": 47, "name": "Mangosteen" },
  { "id": 48, "name": "Nectarine" },
  { "id": 49, "name": "Nashi Pear" },
  { "id": 55, "name": "Peach" },
  { "id": 56, "name": "Pear" },
  { "id": 57, "name": "Papaya" },
  { "id": 58, "name": "Pineapple" },
  { "id": 59, "name": "Passionfruit" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 50, "name": "Orange" },
  { "id": 51, "name": "Olive" },
  { "id": 52, "name": "Oyster Plant" },
  { "id": 53, "name": "Okra" },
  { "id": 54, "name": "Onion" },
  { "id": 60, "name": "Plum" },
  { "id": 61, "name": "Pomegranate" },
  { "id": 62, "name": "Persimmon" },
  { "id": 63, "name": "Quince" },
  { "id": 64, "name": "Raspberry" },
  { "id": 65, "name": "Redcurrant" },
  { "id": 66, "name": "Rhubarb" },
  { "id": 67, "name": "Rambutan" },
  { "id": 68, "name": "Starfruit" },
  { "id": 69, "name": "Strawberry" },
  { "id": 70, "name": "Soursop" },
  { "id": 71, "name": "Tangerine" },
  { "id": 72, "name": "Tomato" },
  { "id": 73, "name": "Ugli Fruit" },
  { "id": 74, "name": "Ulluco" },
  { "id": 75, "name": "Vanilla Bean" },
  { "id": 76, "name": "Velvet Bean" },
  { "id": 77, "name": "Watermelon" },
  { "id": 78, "name": "White Currant" },
  { "id": 79, "name": "Wolfberry" },
  { "id": 80, "name": "Xigua" },
  { "id": 81, "name": "Ximenia" },
  { "id": 82, "name": "Yam" },
  { "id": 83, "name": "Yellow Passionfruit" },
  { "id": 84, "name": "Yuzu" },
  { "id": 85, "name": "Zucchini" },
  { "id": 86, "name": "Zinfandel Grape" }
]

