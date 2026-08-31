import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione";
import Home from "./pages/Home";
import Collezione from "./pages/Collezione";
import Cerca from "./pages/Cerca";
import DettaglioGioco from "./pages/DettaglioGioco";
import DettaglioVoce from "./pages/DettaglioVoce";
import Statistiche from "./pages/Statistiche";
import Navbar from "./components/Navbar";
import RottaProtetta from "./components/RottaProtetta";
import Categoria from "./pages/Categoria";
import Profilo from "./pages/Profilo";
import Footer from "./components/Footer";
import Amici from "./pages/Amici";
import Feed from "./pages/Feed";
import Notifiche from "./pages/Notifiche";

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
                <Home />
              </div>
            </RottaProtetta>
          }
        />

        <Route
          path="/collezione"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Collezione />
              </div>
            </RottaProtetta>
          }
        />

        <Route
          path="/collezione/:id"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <DettaglioVoce />
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

        <Route
          path="/statistiche"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Statistiche />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/categoria/:codice"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Categoria />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/profilo"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Profilo />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/amici"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Amici />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/feed"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Feed />
              </div>
            </RottaProtetta>
          }
        />
        <Route
          path="/notifiche"
          element={
            <RottaProtetta>
              <div className="contenuto">
                <Notifiche />
              </div>
            </RottaProtetta>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
