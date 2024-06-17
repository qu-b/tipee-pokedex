import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ width: "100%", padding: "16px 16px", display: "block" }}>
      <Typography variant="h4" gutterBottom>
        Error 404: Not Found{" "}
      </Typography>
    </Box>
  );
}
