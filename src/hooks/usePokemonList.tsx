import { useQuery } from "react-query";
import axios from "axios";

const fetchPokemonList = async (page: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=48&offset=${(page - 1) * 48}`
  );
  return response.data.results;
};

export const usePokemonList = (page: number) => {
  return useQuery(["pokemonList", page], () => fetchPokemonList(page), {
    keepPreviousData: true,
  });
};
