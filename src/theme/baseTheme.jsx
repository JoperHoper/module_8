import { createTheme } from "@mui/material/styles";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const baseTheme = createTheme({
    palette: {
        primary: { main: "#7C93C3", contrastText: "#efefef" },
        secondary: { main: "#3CA899", contrastText: "#ffffff" },
    },
    typography: {
        fontFamily: "Montserrat",
        fontSize: 14,
        h1: { fontSize: 30 },
    },
    shape: { borderRadius: 0 },
    components: {
        MuiCssBaseline: {
            styleOverrides: `a { color: #3CA899; }`,
        },
        MuiButton: { defaultProps: { variant: "outlined" } },
        MuiTextField: { defaultProps: { variant: "filled" } },
        MuiPaper: { defaultProps: { sx: { border: "solid 2px pink" } } },
    },
});
