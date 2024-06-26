import { Box, FlatList } from 'native-base';
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import CategoriesList from '../../Components/Categories/CategoriesList';
import { useData } from '../../context/DataContext';
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';

const CategoryScreen = () => {
    const navigation = useNavigation()
    const { categoriesState, fetchData } = useData()
    const [allProducts, setAllProducts] = useState([])
    const { categoryRoutes } = useData()
    //console.log(categoryRoutes)


    const [param, setParam] = useState(false)
    const route = useRoute()

    useEffect(() => {
        //@ts-ignore
        setParam(route?.params.isInHome)
    }, [route])


    const renderItems = (item: any) => <CategoriesList item={item} onPress={handlePress} />

    const handlePress = (key: any) => {
        console.log(key)
        // @ts-ignore
        navigation.navigate("ProductScreen", { route: categoryRoutes, index: key })

    }



    return (
        <Box flex={1}>
            {param && <TopBar />}
            <Box _dark={{
                bg: "#141615"
            }} _light={{
                bg: "#eff3f6"
            }}  h={param ? "88%" : "100%"} pb={2} top={param ? 12 : 0} justifyContent={"center"}>

                <FlatList numColumns={3} data={categoriesState} renderItem={renderItems} />
            </Box>
            {param && <BottomBar />}
        </Box >
    )
}

export default CategoryScreen;
