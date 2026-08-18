import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione";
import Collezione from "./pages/Collezione";
import Navbar from "./components/Navbar";
import RottaProtetta from "./components/RottaProtetta";
import Cerca from "./pages/Cerca";
import DettaglioGioco from "./pages/DettaglioGioco";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrazione" element={<Registrazione />} />
        <Route
          path="/"
          element={
            <RottaProtetta>
              <Collezione />
            </RottaProtetta>
          }
        />
        <Route
          path="/cerca"
          element={
            <RottaProtetta>
              <Cerca />
            </RottaProtetta>
          }
        />
        <Route
          path="/gioco/:id"
          element={
            <RottaProtetta>
              <DettaglioGioco />
            </RottaProtetta>
          }
        />
      </Routes>
    </>
  );
}

export default App;
