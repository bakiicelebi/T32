import { useEffect, useState } from "react";
import axios from "axios";

const UseAllProductsFetch = (url: string) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [url]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let allProductsData:any = [];
            for (let i = 0; i <= 11; i++) {
                const { data: responseData } = await axios.get(`${url}${i}`,{timeout:3000});
                allProductsData = [...allProductsData, ...responseData];
            }
            setLoading(false);
            setData(allProductsData);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { error, loading, data ,fetchData};
};

export default UseAllProductsFetch;
