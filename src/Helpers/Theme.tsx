import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',  // Set the default background color
    },
  },
  components: {
    // MUI v5 way of overriding the styles globally
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          background: `
            repeating-linear-gradient(45deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%),
            repeating-linear-gradient(135deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%)
          `,
          backgroundSize: '3em 3em',
          backgroundColor: '#ffffff',
          opacity: 1,
        },
        html: {
          background: `
            repeating-linear-gradient(45deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%),
            repeating-linear-gradient(135deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%)
          `,
          backgroundSize: '3em 3em',
          backgroundColor: '#56765',
          opacity: 1,
        },
        body: {
          background: `
            repeating-linear-gradient(45deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%),
            repeating-linear-gradient(135deg, #4f46e4 0, #4f46e4 10%, transparent 0, transparent 50%)
          `,
          backgroundSize: '3em 3em',
          backgroundColor: '#ffffff',
          opacity: 1,
        },
      },
    },
  },
});

export default theme;
