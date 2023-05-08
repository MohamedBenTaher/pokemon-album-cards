import { AxiosResponse } from "axios";
import API from "./axiosInstance";

export const getPokemonList = () => {
  let result= API("get", `/pokemon/?offset=0&limit=20`);
  console.log('getPokemonList',result)
  return result
};

export const loadMorePokemonList = (limit:number) => {
  let result= API("get", `/pokemon/?offset=${limit}&limit=20`);
  console.log('loadMorePokemonList',result)
  return result;
};

export const getPokemonInfo = (pokeId:Number) => {
  const url=`https://pokeapi.co/api/v2/pokemon/${pokeId}`
  let result= API("get", `https://pokeapi.co/api/v2/pokemon/${pokeId}`);
  console.log('get poke info',url,result)
  return result
};