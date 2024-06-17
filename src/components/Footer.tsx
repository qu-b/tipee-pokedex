import { Box, Typography, Link } from "@mui/material";
import styled from "styled-components";

function Copyright() {
  return (
    <Typography variant="body2" color="#ffffff" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        tipeePokédex
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container>
      <Copyright />
    </Container>
  );
}

const Container = styled(Box)`
  width: 100%;
  height: 60px;
  background-color: #36454f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  bottom: 0;
`;
