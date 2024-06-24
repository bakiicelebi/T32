import { useEffect, useState } from "react"
import axios from "axios"

const UseCategoryFetch =  (url: any) => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => { fetchData() }, [])
    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.get(url);
            setLoading(false)
            setData(responseData);
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    };

    return { error, loading, data,fetchData }
}

export default UseCategoryFetch;