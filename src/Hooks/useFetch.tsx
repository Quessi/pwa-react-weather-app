import React, { useEffect } from "react";
import API from "../Utils/API";

function useFetch() {
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<boolean>();
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (endpoint: string, params: object) => {
    try {
      setError(false);
      setLoading(true);
      const response: any = await API.get(`${endpoint}`, { params: { ...params } });
      const { data } = response ?? response?.data;
      setData(data);
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{


  },[])
  return { fetchData, data, loading, error };
}

export default useFetch;
