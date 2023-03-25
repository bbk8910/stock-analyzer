import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
