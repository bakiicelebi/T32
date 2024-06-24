import { useEffect, useState } from "react";
import axios from "axios";

const UseAllProductsFetch = (url: string, index: number) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [url]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.get(`${url}${index}`);
            setLoading(false);
            setData(responseData);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { error, loading, data };
};

export default UseAllProductsFetch;
