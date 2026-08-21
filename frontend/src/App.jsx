import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione";
import Collezione from "./pages/Collezione";
import Cerca from "./pages/Cerca";
import DettaglioGioco from "./pages/DettaglioGioco";
import Navbar from "./components/Navbar";
import RottaProtetta from "./components/RottaProtetta";

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
              <div className="contenuto">
                <Collezione />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/cerca"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Cerca />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/gioco/:id"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <DettaglioGioco />
              </div>
            </RottaProtetta>
          }
        />
      </Routes>
    </>
  );
}

export default App;
