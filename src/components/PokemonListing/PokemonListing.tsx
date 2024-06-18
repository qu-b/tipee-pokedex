import { Button, CardContent, Modal, Typography } from "@mui/material";
import { useModalState } from "../../hooks/useModalState";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { usePokemonPagination } from "../../hooks/usePokemonPagination";
import { PokemonCardModal } from "../PokemonCardModal";
import * as S from "./styled";

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
  const { pokemon, page, handleNextPage, handlePrevPage } =
    usePokemonPagination();
  const { modalOpen, selectedPokemon, openModal, closeModal } = useModalState();
  const { data: pokemonDetails } = usePokemonDetails(
    selectedPokemon?.url || ""
  );

  const handlePokemonClick = (pokemon: Pokemon) => {
    openModal(pokemon);
  };

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
          {pokemonDetails && pokemonDetails.sprites ? (
            <PokemonCardModal
              image={
                pokemonDetails.sprites.front_default || "default_image_url"
              }
              title={pokemonDetails.name || "Unknown"}
              height={`Height: ${pokemonDetails.height ?? "N/A"}`}
              weight={`Weight: ${pokemonDetails.weight ?? "N/A"}`}
              base_experience={`Base Experience: ${
                pokemonDetails.base_experience ?? "N/A"
              }`}
              abilities={
                pokemonDetails.abilities.map(
                  (a: { ability: { name: string } }) => a.ability.name
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
