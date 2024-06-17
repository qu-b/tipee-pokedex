import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Pokemon } from "../components/PokemonListing/PokemonListing";
import { useQuery } from "react-query";

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

export function usePokemonPagination() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState(pageFromUrl);

  const { data: pokemon = [], isLoading, isError } = usePokemonList(page);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [location.search, pageFromUrl]);

  const handleNextPage = () => {
    if (pokemon.length < 48) {
      return;
    }
    navigate(`?page=${page + 1}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      navigate(`?page=${page - 1}`);
    }
  };

  return { pokemon, page, handleNextPage, handlePrevPage, isLoading, isError };
}
