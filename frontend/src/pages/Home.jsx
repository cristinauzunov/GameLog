import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import api from "../api";
import FilaGiochi from "../components/FilaGiochi";
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
  const [giochiPerGenere, setGiochiPerGenere] = useState({});
  const [giocoBanner, setGiocoBanner] = useState(null);
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
    for (let i = 0; i < generi.length; i++) {
      caricaGenere(generi[i].codice);
    }

    async function caricaGenere(codice) {
      try {
        const risposta = await api.get("/giochi/genere/" + codice);
        setGiochiPerGenere((precedenti) => {
          const nuovo = { ...precedenti };
          nuovo[codice] = risposta.data;
          return nuovo;
        });
      } catch {
        setGiochiPerGenere((precedenti) => {
          const nuovo = { ...precedenti };
          nuovo[codice] = [];
          return nuovo;
        });
      }
    }
  }, []);

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
          {giochiPerGenere[g.codice] ? (
            <FilaGiochi giochi={giochiPerGenere[g.codice].slice(0, 5)} />
          ) : (
            <p className="text-muted">Caricamento...</p>
          )}
        </div>
      ))}
    </Container>
  );
}

export default Home;
