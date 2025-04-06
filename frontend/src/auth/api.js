import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:8000/auth/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getCsrfToken = async () => {
  const res = await authAPI.get("get/csrf/");
  return res;
};


export default authAPI;
