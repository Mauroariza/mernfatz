import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  baseURL: API_URL,
  // headers:{
  //   'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
  // },
  withCredentials: true,
});

export default instance;
