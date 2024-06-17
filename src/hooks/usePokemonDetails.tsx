import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPokemonDetails = async (pokemonUrl: string) => {
  const response = await axios.get(pokemonUrl);
  return response.data;
};

export const usePokemonDetails = (pokemonUrl: string) => {
  return useQuery(['pokemonDetails', pokemonUrl], () => fetchPokemonDetails(pokemonUrl), {
    enabled: !!pokemonUrl,
  });
};
