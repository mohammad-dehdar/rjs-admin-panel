import axios from "axios";
import { getCookie } from "../utils/cookie";

//instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers : {
        "Content-Type" : "application/json"
    }
})

//interceptor
api.interceptors.request.use((request) =>{
    const token = getCookie("token")
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`
    }
    return request;
})

export default api