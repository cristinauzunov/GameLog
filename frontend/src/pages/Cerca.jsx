import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";
import "../cerca.css";

function Cerca() {
  const [titolo, setTitolo] = useState("");
  const [ordina, setOrdina] = useState("");
  const [anno, setAnno] = useState("");
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
        let url = "/giochi/cerca?titolo=" + titolo;
        if (ordina) {
          url = url + "&ordina=" + ordina;
        }
        if (anno) {
          url = url + "&anno=" + anno;
        }
        const risposta = await api.get(url);
        setRisultati(risposta.data);
      } catch {
        setRisultati([]);
      } finally {
        setCaricamento(false);
      }
    }
  }, [titolo, ordina, anno]);

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

      <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={ordina}
          onChange={(e) => setOrdina(e.target.value)}
        >
          <option value="">Rilevanza</option>
          <option value="name">Nome (A-Z)</option>
          <option value="-released">Piu recenti</option>
          <option value="-metacritic">Miglior voto</option>
        </select>

        <select
          className="form-select"
          style={{ maxWidth: "150px" }}
          value={anno}
          onChange={(e) => setAnno(e.target.value)}
        >
          <option value="">Tutti gli anni</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2015">2015</option>
          <option value="2010">2010</option>
        </select>
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
