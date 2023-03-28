import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
  palette: {
    primary: {
      main: "#1378A5",
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: ["Lato", "Roboto", "Helvetica"].join(","),
  },
});
theme = responsiveFontSizes(theme);
export default theme;
