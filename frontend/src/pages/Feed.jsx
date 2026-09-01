import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";

function Feed() {
  const [elementi, setElementi] = useState([]);
  const [caricamento, setCaricamento] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function caricaFeed() {
      try {
        const rispAttivita = await api.get("/attivita/feed");
        const rispRecensioni = await api.get("/recensioni/feed");

        const lista = [];

        for (let i = 0; i < rispAttivita.data.length; i++) {
          const a = rispAttivita.data[i];
          lista.push({
            genere: "attivita",
            id: "a" + a.id,
            utente: a.utente,
            idRawg: a.idRawg,
            titoloGioco: a.titoloGioco,
            copertina: a.copertina,
            tipo: a.tipo,
            data: a.dataCreazione,
            ordinamento: a.id,
          });
        }

        for (let i = 0; i < rispRecensioni.data.length; i++) {
          const r = rispRecensioni.data[i];
          lista.push({
            genere: "recensione",
            id: "r" + r.id,
            utente: r.utente,
            idRawg: r.idRawg,
            titoloGioco: r.titoloGioco,
            testo: r.testo,
            voto: r.voto,
            data: r.dataCreazione,
            ordinamento: r.id,
          });
        }

        lista.sort(function (x, y) {
          if (x.data === y.data) {
            return y.ordinamento - x.ordinamento;
          }
          return y.data.localeCompare(x.data);
        });

        setElementi(lista);
      } catch {
        setElementi([]);
      } finally {
        setCaricamento(false);
      }
    }
    caricaFeed();
  }, []);

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner8bit />
      </Container>
    );
  }

  function avatarDi(u) {
    if (u.avatar) {
      return (
        <img
          src={u.avatar}
          alt="avatar"
          style={{
            width: "44px",
            height: "44px",
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
          width: "44px",
          height: "44px",
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
        {(u.nome || u.username || "?").charAt(0).toUpperCase()}
      </div>
    );
  }

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

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Feed</h2>

      {elementi.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>Il tuo feed è vuoto.</p>
          <p>
            Segui altri utenti dalla pagina Amici per vedere le loro attività
            qui.
          </p>
          <button
            type="button"
            className="btn-gamelog"
            onClick={() => navigate("/amici")}
          >
            Trova utenti da seguire
          </button>
        </div>
      ) : (
        elementi.map((el) => (
          <Card key={el.id} className="mb-3">
            <Card.Body>
              <div
                className="d-flex align-items-center gap-2 mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/utente/" + el.utente.id)}
              >
                {avatarDi(el.utente)}
                <div>
                  <strong>{el.utente.nome || el.utente.username}</strong>
                  <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {el.genere === "recensione"
                      ? "ha recensito " + (el.titoloGioco || "un gioco")
                      : testoAzione(el.tipo, el.titoloGioco || "un gioco")}
                    {" · "}
                    {el.data}
                  </div>
                </div>
                {el.genere === "recensione" && el.voto && (
                  <span
                    className="ms-auto"
                    style={{ color: "#ffc107", fontWeight: "bold" }}
                  >
                    {el.voto}/10
                  </span>
                )}
              </div>

              {el.genere === "recensione" && <p className="mb-2">{el.testo}</p>}

              {el.genere === "attivita" && el.copertina && (
                <img
                  src={el.copertina}
                  alt={el.titoloGioco}
                  style={{
                    width: "100%",
                    maxHeight: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <button
                type="button"
                className="btn-gamelog-sm"
                onClick={() => navigate("/gioco/" + el.idRawg)}
              >
                Vedi il gioco
              </button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Feed;
