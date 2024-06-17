import { useState, useEffect } from "react";
import { Pokemon } from "../components/PokemonListing/PokemonListing";

export function useModalState() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const modalState = localStorage.getItem("modalOpen") === "true";
    const savedPokemon = localStorage.getItem("selectedPokemon");
    if (modalState && savedPokemon) {
      setModalOpen(true);
      setSelectedPokemon(JSON.parse(savedPokemon));
    }
  }, []);

  const openModal = (pokemon: Pokemon) => {
    setModalOpen(true);
    setSelectedPokemon(pokemon);
    localStorage.setItem("modalOpen", "true");
    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
    localStorage.setItem("modalOpen", "false");
    localStorage.removeItem("selectedPokemon");
  };

  return { modalOpen, selectedPokemon, openModal, closeModal };
}
