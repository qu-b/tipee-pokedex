import styled from "styled-components";
import { Box, Card } from "@mui/material";

export const PokemonGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const PokemonCard = styled(Card)`
  cursor: pointer;
  text-align: center;
  text-transform: capitalize;
  padding: px;
`;

export const Container = styled(Box)`
  margin-bottom: 60px;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  /* margin-top: 16px; */
  padding: 16px;
`;

export const ModalContent = styled(Box)`
  top: 40%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 24;
`;
