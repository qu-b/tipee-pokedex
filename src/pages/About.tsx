import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function About() {
  return (
    <Box sx={{ width: "100%", padding: "16px 16px", display: "block" }}>
      <Typography variant="h4" gutterBottom>
        About the Pokédex
      </Typography>
      <Typography gutterBottom>
        The Pokédex, known as ポケモン図鑑 (Pokémon Zukan) in Japanese, meaning
        "Pokémon Encyclopedia," is an essential device for any Pokémon Trainer.
        This advanced piece of technology records detailed information about all
        known Pokémon species. As a Trainer, your mission is to complete the
        Pokédex by capturing every one of the 1008 Pokémon species spread across
        nine generations. However, it's important to note that no single game in
        the series contains all of these Pokémon, so you'll need to trade and
        explore different regions to achieve this ultimate goal.
      </Typography>
    </Box>
  );
}

export default About;
