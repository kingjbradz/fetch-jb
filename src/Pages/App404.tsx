import { Box, Typography } from "@mui/material";

const App404 = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          maxWidth: "200px",
          margin: "auto",
          bgcolor: "background.paper",
          padding: 1,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography>Page not found</Typography>
      </Box>
    </Box>
  );
};

export default App404;
