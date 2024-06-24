import { useEffect, useState } from "react";
import axios from "axios";

const useCategoryRoutesFetch = (url: any) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<{ key: string; title: string }>>([]); // Initialize as an empty array

  useEffect(() => {
    fetchData();
  }, [url]); // Adding url as a dependency to refetch if the url changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: responseData } = await axios.get(url);
      const modifiedData = responseData.map((item: any) => ({
        key: item.key.toString(),
        title: item.name,
      }));
      setData(modifiedData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  return { error, loading, data, fetchData };
};

export default useCategoryRoutesFetch;
