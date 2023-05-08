import axios from "axios";
import humps from "humps";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default function api(method:string, url:string, data = {}, options = {}) {
  const httpMethod = method.toLowerCase();

  const hasData = ["post", "put", "patch"].indexOf(httpMethod) >= 0;
  const settings = hasData ? options : data;

  const request  = axiosInstance.get(url, settings);

  return request;
}