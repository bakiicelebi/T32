import * as React from 'react';
import { View, useWindowDimensions, Text, Animated } from 'react-native';
import { TabView,TabBarProps, TabBar, SceneMap } from 'react-native-tab-view';
import Meals from '../Meals';
import { API_CATEGORIES } from '@env';
import UseCategoryFetch from '../../Hook/UseCategoryFetch';
import Loading from '../../../StoreApp/components/Loading';
import UseFetch from '../../../StoreApp/UseFetch';

const data = [
    { key: "1", title: 'Beef' },
    { key: "2", title: 'Chicken' },
    { key: "3", title: 'Dessert' },
    { key: "4", title: 'Lamb' },
    { key: "5", title: 'Miscellaneous' },
    { key: "6", title: 'Pasta' },
    { key: "7", title: 'Pork' },
    { key: "8", title: 'Seafood' },
    { key: "9", title: 'Side' },
    { key: "10", title: 'Starter' },
    { key: "11", title: 'Vegan' },
    { key: "12", title: 'Vegetarian' },
    { key: "13", title: 'Breakfast' },
    { key: "14", title: 'Goat' },
];

const Tab = ({ route, navigation }: any) => {
    
    
    const layout = useWindowDimensions();

    const renderScene = ({ route }: any) => <Meals navigation={navigation} strCategory={route.title} />
    
    const renderTabBar = (props: any) => (
        <TabBar
            
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: '#ffab0f' }}
            style={{ backgroundColor: "#7e7e81", padding: 1 }}
            activeColor='#ffab0f'
            navigationState={{ routes, index }}
            labelStyle={{ fontSize: 15, fontWeight: "500" }}
            pressColor='#3d3d3f'
            
        />
    );
    

    const [index, setIndex] = React.useState<number>(route.params.id - 1);
    const [routes, setRoute] = React.useState<{ key: string, title: string }[]>(data)

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            lazyPreloadDistance={1}
            lazy={true}
        />
    )
}

export default Tab;





















              //             ^ ^            /
          //                (•_•)----------/ 
            //                   | |  \  \
//\\\\\\\\\\\   \\\\/////\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////
//\\\\\\\\\\\\\\        \\/////\  \\\\\\\\\\\\\/////\\\\\\\\\\\\
            //\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////
//\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////\       \\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////
//\\\\\\\\\ \\\\\\\/////\\\\\    \\\\\\\\\\\////  \\\///
//\\\\\\\\\\\\\\\\/////\\\\  \\\\\\\\\\\\/////
//\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////\\\\\\\\\\\ \\\\\/////\\\\\\\\\\\\\\\\/////
//\\\\\\\\\\\\\\\\/     ////\\\\\\\\\\\\\\      \\/////\\\\\\\\\\\\\\\\/////\\\\\\\\\\\\\\\\/////
