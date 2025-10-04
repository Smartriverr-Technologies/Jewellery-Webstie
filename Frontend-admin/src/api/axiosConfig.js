import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  // Read the base URL from the environment variables we created
  baseURL: import.meta.env.VITE_API_URL,
});

// Export the configured instance
export default api;