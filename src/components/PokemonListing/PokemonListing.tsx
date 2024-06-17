import { Button, CardContent, Modal, Typography } from "@mui/material";
import { useModalState } from "../../hooks/useModalState";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { usePokemonList } from "../../hooks/usePokemonPagination";
import { PokemonCardModal } from "../PokemonCardModal";
import * as S from "./styled";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Pokemon {
  name: string;
  url: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}

export default function PokemonListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState(pageFromUrl);

  const { data: pokemon = [], isLoading } = usePokemonList(page);
  const { modalOpen, selectedPokemon, openModal, closeModal } = useModalState();
  const pokemonDetailsQuery = usePokemonDetails(selectedPokemon?.url || "");

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

  const handlePokemonClick = (pokemon: Pokemon) => {
    openModal(pokemon);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <S.PokemonGrid>
        {pokemon.map((p: Pokemon, index: number) => (
          <S.PokemonCard key={index} onClick={() => handlePokemonClick(p)}>
            <CardContent>
              <Typography variant="h5">{p.name}</Typography>
            </CardContent>
          </S.PokemonCard>
        ))}
      </S.PokemonGrid>

      <S.ButtonContainer>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={page === 1}
          sx={{ backgroundColor: "white", color: "black" }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={pokemon.length < 48}
          sx={{ marginLeft: "8px", backgroundColor: "white", color: "black" }}
        >
          Next
        </Button>
      </S.ButtonContainer>

      <Modal open={modalOpen} onClose={closeModal}>
        <S.ModalContent>
          {pokemonDetailsQuery.isLoading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : pokemonDetailsQuery.isError ? (
            <Typography variant="h6">Error loading Pokémon details</Typography>
          ) : pokemonDetailsQuery.data && pokemonDetailsQuery.data.sprites ? (
            <PokemonCardModal
              image={
                pokemonDetailsQuery.data.sprites.front_default ||
                "default_image_url"
              }
              title={pokemonDetailsQuery.data.name || "Unknown"}
              height={`Height: ${pokemonDetailsQuery.data.height ?? "N/A"}`}
              weight={`Weight: ${pokemonDetailsQuery.data.weight ?? "N/A"}`}
              base_experience={`Base Experience: ${
                pokemonDetailsQuery.data.base_experience ?? "N/A"
              }`}
              abilities={
                pokemonDetailsQuery.data.abilities.map(
                  (a: {ability: { name: string }}) => a.ability.name
                ) || ["Unknown"]
              }
            />
          ) : (
            <Typography variant="h6">No Pokémon selected</Typography>
          )}
        </S.ModalContent>
      </Modal>
    </S.Container>
  );
}
