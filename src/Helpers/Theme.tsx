import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#e5e5f7",
          opacity: 0.8,
          backgroundImage: "radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
          backgroundSize: "10px 10px",
        },
      },
    },
  },
});
