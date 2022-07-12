import { DefaultTheme, ThemeProvider } from "styled-components";
import "./App.css";
import { AuthContextProvider } from "./context/authContext";
import { SocketContextProvider } from "./context/socketContext";
import { AppRoutes } from "./routes";

export const defaultTheme: DefaultTheme = {
  borderRadius: "4px",
  palette: {
    primary: {
      main: "black",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#363636",
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#171717",
      contrastText: "#363636",
    },
    border: {
      color: "#045202",
    },
  },
};

function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <AppRoutes />
        </ThemeProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
