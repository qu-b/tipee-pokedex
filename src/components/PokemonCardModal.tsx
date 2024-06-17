import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styled from "styled-components";

interface PokemonCardProps {
  image: string;
  title: string;
  height: string;
  weight: string;
  base_experience: string;
  abilities: string[];
}

export function PokemonCardModal({
  image,
  title,
  height,
  weight,
  base_experience,
  abilities,
}: PokemonCardProps) {
  return (
    <CardContainer>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {height}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {base_experience}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Abilities:
        </Typography>
        {abilities.map((ability, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {ability}
          </Typography>
        ))}
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled(Card)`
  max-width: 345;
  padding: 1;
  text-transform: capitalize;
`;
