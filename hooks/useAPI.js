// useAPI.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const localAPI = 'http://192.168.1.10:8917';
const cloudAPI = 'https://rbms-backend-g216.onrender.com';

const useAPI = () => {
  const [topBikes, setTopBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopBikes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${localAPI}/rbmsa/topBikes`); // Replace with your API endpoint
      setTopBikes(response.data); // Assuming data is an array of bikes
    } catch (error) {
      setError("Error fetching bikes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopBikes(); 
    const intervalId = setInterval(() => {
      fetchTopBikes(); // Fetch bikes every 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { topBikes, loading, error };
};

export default useAPI;