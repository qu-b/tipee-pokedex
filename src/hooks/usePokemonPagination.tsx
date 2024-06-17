import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePokemonList } from "./usePokemonList";

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
