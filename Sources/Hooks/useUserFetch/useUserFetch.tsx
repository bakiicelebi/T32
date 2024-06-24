import React, { useState, useEffect } from "react";
import axios from "axios";

const useUserFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(url + "users");
            setData(response.data); // Assuming the response data structure matches your needs
        } catch (error) {
           setError(error)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData };
};
export default useUserFetch