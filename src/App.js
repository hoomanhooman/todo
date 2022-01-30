import "./App.css";
import Todo from "./Todo";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const lightTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        light: "#008800",
        main: "#800000",
        dark: "#800000AA",
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Todo />
      </ThemeProvider>
    </div>
  );
}

export default App;
