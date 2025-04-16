import axios from "axios";

const urlAPI = axios.create({
  baseURL: "http://localhost:8000/urls/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default urlAPI;
