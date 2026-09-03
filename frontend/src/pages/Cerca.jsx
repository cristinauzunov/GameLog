import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";
import "../cerca.css";

function Cerca() {
  const [titolo, setTitolo] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [cercato, setCercato] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      cercaGiochi();
    }, 400);

    return () => clearTimeout(timer);

    async function cercaGiochi() {
      if (titolo.trim() === "") {
        setRisultati([]);
        setCercato(false);
        return;
      }

      setCaricamento(true);
      setCercato(true);
      try {
        const risposta = await api.get("/giochi/cerca?titolo=" + titolo);
        setRisultati(risposta.data);
      } catch {
        setRisultati([]);
      } finally {
        setCaricamento(false);
      }
    }
  }, [titolo]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Cerca giochi</h2>

      <div className="cerca-barra">
        <div className="cerca-input-wrapper">
          <Search className="cerca-icona" />
          <input
            type="text"
            className="cerca-input"
            placeholder="Scrivi il titolo di un gioco..."
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
          />
        </div>
      </div>

      {caricamento && <Spinner8bit />}

      {!caricamento && !cercato && (
        <div className="cerca-vuoto">
          <p>Cerca un gioco per aggiungerlo alla tua collezione</p>
        </div>
      )}

      {!caricamento && cercato && risultati.length === 0 && (
        <div className="cerca-vuoto">
          <p>Nessun gioco trovato. Prova con un altro titolo.</p>
        </div>
      )}

      <div className="cerca-griglia">
        {risultati.map((gioco) => (
          <div
            key={gioco.id}
            className="cerca-card"
            onClick={() => navigate("/gioco/" + gioco.id)}
          >
            {gioco.background_image ? (
              <img
                src={gioco.background_image}
                alt={gioco.name}
                className="cerca-card-cover"
              />
            ) : (
              <div className="cerca-card-cover-vuota">{gioco.name}</div>
            )}
            <div className="cerca-card-corpo">
              <div className="cerca-card-titolo">{gioco.name}</div>
              <div className="cerca-card-data">
                {gioco.released ? gioco.released : "-"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Cerca;
