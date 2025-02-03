import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff", // White background
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(240,6.7%,17.6%,1)'/><path d='M40 45a5 5 0 110-10 5 5 0 010 10zM0 45a5 5 0 110-10 5 5 0 010 10zM0 5A5 5 0 110-5 5 5 0 010 5zm40 0a5 5 0 110-10 5 5 0 010 10z' stroke-width='1' stroke='hsla(47,80.9%,61%,1)' fill='none'/><path d='M20 25a5 5 0 110-10 5 5 0 010 10z' stroke-width='1' stroke='hsla(4.1,89.6%,58.4%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
          // backgroundRepeat: 'repeat',
          // backgroundSize: "5em 5em", // Controls the repeat spacing
          // // backgroundColor: "#ffffff",
          // // backgroundColor: "#000001",
          // opacity: 1,
          backgroundColor: '#e5e5f7',
          opacity: 0.8,
          backgroundImage: 'radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)',
          backgroundSize: '10px 10px',
        },
      },
    },
  },
});