import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_CAMPAIGNS_URL, API_CATEGORIES_URL } from '@env';
import useAllProductsFetch from '../../Hooks/useAllProductsFetch';
import useCategoryFetch from '../../Hooks/useCategoryFetch';
import useCategoryRoutesFetch from '../../Hooks/useCategoryRoutesFetch';
import useCampaignFetch from '../../Hooks/useCampaignFetch';
import useUserFetch from '../../Hooks/useUserFetch';

type DataContextType = {
    products: any[];
    categoriesState: any[];
    loading: boolean;
    categoryRoutes: { key: string, title: string }[];
    campaignsState: any[];
    favorites: any[];
    fetchData: () => Promise<void>;
    fetchAll: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchRoutes: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    fetchCampaigns: () => Promise<void>;
    userData: any[] | null;
    inUser: any[] | null;
    addFavorite: (item: any) => void;
    removeFavorite: (item: any) => void;
    addUser: () => void;
    removeUser: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [categoriesState, setCategories] = useState<any[]>([]);
    const [categoryRoutes, setCategoryRoutes] = useState<{ key: string, title: string }[]>([]);
    const [campaignsState, setCampaigns] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([])
    const [inUser, setInUser] = useState<any[]>([])

    const { data: users, fetchData: fetchUsers } = useUserFetch(API_BASE_URL);
    const { data: allProducts, fetchData: fetchAll } = useAllProductsFetch(API_BASE_URL);
    const { data: categories, fetchData: fetchCategories } = useCategoryFetch(API_CATEGORIES_URL);
    const { data: routes, fetchData: fetchRoutes } = useCategoryRoutesFetch(API_CATEGORIES_URL);
    const { data: campaigns, fetchData: fetchCampaigns } = useCampaignFetch(API_CAMPAIGNS_URL);

    //console.log("update")

    useEffect(() => {
        fetchData();
        console.log("Data Fetched")
    }, [users, allProducts, categories, routes, campaigns]);

    const fetchData = async () => {

        try {
            setLoading(true);

            if (users && users.length > 0) {
                await AsyncStorage.setItem('users', JSON.stringify(users));
                setProducts(users);
            }

            if (allProducts && allProducts.length > 0) {
                await AsyncStorage.setItem('products', JSON.stringify(allProducts));
                setProducts(allProducts);
            }

            if (categories && categories.length > 0) {
                await AsyncStorage.setItem('categories', JSON.stringify(categories));
                setCategories(categories);
            }

            if (routes && routes.length > 0) {
                await AsyncStorage.setItem('categoryRoutes', JSON.stringify(routes));
                setCategoryRoutes(routes);
            }

            if (campaigns && campaigns.length > 0) {
                await AsyncStorage.setItem('campaigns', JSON.stringify(campaigns));
                setCampaigns(campaigns);
            }

            await loadData();
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const loadData = async () => {
        try {
            const userDataGet = await AsyncStorage.getItem('users');
            const productsData = await AsyncStorage.getItem('products');
            const categoriesData = await AsyncStorage.getItem('categories');
            const categoryRoutesData = await AsyncStorage.getItem('categoryRoutes');
            const campaignsData = await AsyncStorage.getItem('campaigns');
            const favoritesData = await AsyncStorage.getItem('favorites');

            if (userDataGet) setUserData(JSON.parse(userDataGet));
            if (productsData) setProducts(JSON.parse(productsData));
            if (categoriesData) setCategories(JSON.parse(categoriesData));
            if (categoryRoutesData) setCategoryRoutes(JSON.parse(categoryRoutesData));
            if (campaignsData) setCampaigns(JSON.parse(campaignsData));
            if (favoritesData) setFavorites(JSON.parse(favoritesData));
        } catch (error) {
            console.error('Error loading data from AsyncStorage: ', error);
        }
    };

    const addFavorite = async (item: any) => {
        try {
            const updatedFavorites = [...favorites, item];
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error adding favorite: ', error);
        }
    };

    const removeFavorite = async (item: any) => {
        try {
            const updatedFavorites = favorites.filter(fav => fav.Barcode !== item.Barcode);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            loadData()
        } catch (error) {
            console.error('Error removing favorite: ', error);
        }
    };

    useEffect(() => {
        addUser()
    }, [])

    const addUser = async () => {
        const item: any = await getUserData()
        setInUser(item)
    }

    const getUserData = async () => {

        try {
            const item: any = await AsyncStorage.getItem('userData')
            const dataParse = JSON.parse(item)
            return dataParse;
        }
        catch {
            (err: any) => console.log(err)
        }
    }


    const removeUser = () => {
        setInUser([])
    }

    return (
        <DataContext.Provider
            value={{
                products,
                categoriesState,
                categoryRoutes,
                loading,
                campaignsState,
                favorites,
                userData,
                fetchData,
                addFavorite,
                removeFavorite,
                inUser,
                addUser,
                removeUser,
                fetchAll,
                fetchCampaigns,
                fetchCategories,
                fetchRoutes,
                fetchUsers
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useData };
