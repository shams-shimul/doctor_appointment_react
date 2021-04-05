import { useState, useEffect, useCallback } from 'react';

const axios = require('axios');

export const useAxios = (url) => {
  const [doctors, setDoctors] = useState([])

  const getDoctors = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url])

  useEffect(() => {
    getDoctors();
  }, [url, getDoctors]);

  return { doctors };
}
