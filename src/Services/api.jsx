import axios from "axios";

const api = axios.create({
    baseURL: "https://api.aniapi.com",
});

export default api; 