// src/hooks/useApi.js
import { useState } from 'react';

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      setLoading(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(err);
      setLoading(false);
      return { data: null, error: err };
    }
  };

  return { data, error, loading, request };
}
