// theme/theme.ts
// This file defines a custom MUI theme for the Home Health Care application.
// The primary color is set to a dark navy (`#003366`) to match the Aseer Health
// Cluster branding. You can extend this theme with additional palette values
// or typography settings as needed.

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003366',
    },
    secondary: {
      main: '#1976D2', // secondary accent used throughout the UI
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans‑serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;