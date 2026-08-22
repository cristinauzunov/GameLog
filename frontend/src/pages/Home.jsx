import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import api from "../api";
import FilaGiochi from "../components/FilaGiochi";
import FilaAuto from "../components/FilaAuto";
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
  const [giochiPerGenere, setGiochiPerGenere] = useState({});
  const [caricamento, setCaricamento] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function caricaTutto() {
      try {
        const chiamate = [api.get("/giochi/popolari")];
        for (let i = 0; i < generi.length; i++) {
          chiamate.push(api.get("/giochi/genere/" + generi[i].codice));
        }

        const risultati = await Promise.all(chiamate);

        setTrending(risultati[0].data);

        const perGenere = {};
        for (let i = 0; i < generi.length; i++) {
          perGenere[generi[i].codice] = risultati[i + 1].data;
        }
        setGiochiPerGenere(perGenere);
      } catch {
        //
      } finally {
        setCaricamento(false);
      }
    }
    caricaTutto();
  }, []);

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  const giocoBanner = trending.length > 0 ? trending[0] : null;

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

      <FilaAuto titolo="Trending del momento" giochi={trending} />

      {generi.map((g) => (
        <div key={g.codice}>
          <h4
            className="mb-3 categoria-titolo"
            onClick={() => navigate("/categoria/" + g.codice)}
          >
            {g.nome}{" "}
            <span style={{ fontSize: "0.9rem", color: "#ff5b77" }}>
              vedi tutti ›
            </span>
          </h4>
          <FilaGiochi giochi={(giochiPerGenere[g.codice] || []).slice(0, 5)} />
        </div>
      ))}
    </Container>
  );
}

export default Home;