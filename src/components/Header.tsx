import { Box, Typography } from "@mui/material";
import FadeMenu from "./Menu";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom color="#ffffff">
        Pokédex
      </Typography>
      <FadeMenu />
    </Container>
  );
}

const Container = styled(Box)`
  width: 100%;
  background-color: #ef5350;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;
