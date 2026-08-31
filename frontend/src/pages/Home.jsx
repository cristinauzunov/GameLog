import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import api from "../api";
import FilaAuto from "../components/FilaAuto";
import Spinner8bit from "../components/Spinner8bit";
import "../home.css";

const generi = [
  { nome: "Azione", codice: "action" },
  { nome: "RPG", codice: "role-playing-games-rpg" },
  { nome: "Avventura", codice: "adventure" },
  { nome: "Sparatutto", codice: "shooter" },
  { nome: "Strategia", codice: "strategy" },
  { nome: "Puzzle", codice: "puzzle" },
  { nome: "Sport", codice: "sports" },
];

function Home() {
  const [trending, setTrending] = useState([]);
  const [giocoBanner, setGiocoBanner] = useState(null);
  const [inCorso, setInCorso] = useState([]);
  const [attivitaAmici, setAttivitaAmici] = useState([]);
  const [caricaTrending, setCaricaTrending] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function caricaTrending2() {
      try {
        const risposta = await api.get("/giochi/popolari");
        const lista = risposta.data;
        setTrending(lista);
        if (lista.length > 0) {
          setGiocoBanner(lista[Math.floor(Math.random() * lista.length)]);
        }
      } catch {
        setTrending([]);
      } finally {
        setCaricaTrending(false);
      }
    }
    caricaTrending2();
  }, []);

  useEffect(() => {
    async function caricaMiei() {
      try {
        const risposta = await api.get("/collezione/mia");
        const soloInCorso = [];
        for (let i = 0; i < risposta.data.length; i++) {
          if (risposta.data[i].stato === "IN_CORSO") {
            soloInCorso.push(risposta.data[i]);
          }
        }
        setInCorso(soloInCorso);
      } catch {
        setInCorso([]);
      }
    }
    caricaMiei();
  }, []);

  useEffect(() => {
    async function caricaFeed() {
      try {
        const risposta = await api.get("/attivita/feed");
        setAttivitaAmici(risposta.data.slice(0, 4));
      } catch {
        setAttivitaAmici([]);
      }
    }
    caricaFeed();
  }, []);

  function testoAzione(tipo, titolo) {
    if (tipo === "AGGIUNTO") {
      return "ha aggiunto " + titolo;
    }
    if (tipo === "IN_CORSO") {
      return "sta giocando a " + titolo;
    }
    if (tipo === "FINITO") {
      return "ha finito " + titolo;
    }
    if (tipo === "ABBANDONATO") {
      return "ha abbandonato " + titolo;
    }
    if (tipo === "DA_GIOCARE") {
      return "vuole giocare a " + titolo;
    }
    return "ha aggiornato " + titolo;
  }

  function avatarDi(u) {
    if (u && u.avatar) {
      return (
        <img
          src={u.avatar}
          alt="avatar"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        {u ? (u.nome || u.username || "?").charAt(0).toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {giocoBanner && giocoBanner.background_image && (
        <div
          className="home-banner"
          onClick={() => navigate("/gioco/" + giocoBanner.id)}
        >
          <img src={giocoBanner.background_image} alt={giocoBanner.name} />
          <div className="home-banner-overlay">
            <p className="mb-1" style={{ color: "#ffc107" }}>
              In evidenza
            </p>
            <h2>{giocoBanner.name}</h2>
          </div>
        </div>
      )}

      {caricaTrending ? (
        <Spinner8bit />
      ) : (
        <FilaAuto titolo="Trending del momento" giochi={trending} />
      )}

      <div className="mb-5">
        <h4 className="mb-3">Sfoglia per categoria</h4>
        <div className="categorie-bottoni">
          {generi.map((g) => (
            <button
              key={g.codice}
              type="button"
              className="btn-stato"
              onClick={() => navigate("/categoria/" + g.codice)}
            >
              {g.nome}
            </button>
          ))}
        </div>
      </div>

      {inCorso.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-3">Continua a giocare</h4>
          <div className="fila-giochi">
            {inCorso.map((voce) => (
              <div
                key={voce.id}
                className="fila-card"
                onClick={() => navigate("/collezione/" + voce.id)}
              >
                {voce.gioco.copertina ? (
                  <img
                    src={voce.gioco.copertina}
                    alt={voce.gioco.titolo}
                    className="fila-cover"
                  />
                ) : (
                  <div className="fila-cover fila-cover-vuota">
                    {voce.gioco.titolo}
                  </div>
                )}
                <div className="fila-titolo">{voce.gioco.titolo}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {attivitaAmici.length > 0 && (
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Attività degli amici</h4>
            <span
              style={{
                cursor: "pointer",
                color: "#ff5b77",
                fontSize: "0.9rem",
              }}
              onClick={() => navigate("/feed")}
            >
              vedi tutto ›
            </span>
          </div>
          {attivitaAmici.map((a) => (
            <Card key={a.id} className="mb-2">
              <Card.Body className="d-flex align-items-center gap-3 py-2">
                {avatarDi(a.utente)}
                <div>
                  <strong>{a.utente.nome || a.utente.username}</strong>{" "}
                  <span className="text-muted">
                    {testoAzione(a.tipo, a.titoloGioco || "un gioco")}
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Home;
