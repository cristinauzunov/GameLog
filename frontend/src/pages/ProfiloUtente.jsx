import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";
import { AuthContext } from "../context/AuthContext";

function ProfiloUtente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { utente: utenteLoggato } = useContext(AuthContext);

  const [utente, setUtente] = useState(null);
  const [stat, setStat] = useState(null);
  const [collezione, setCollezione] = useState([]);
  const [recensioni, setRecensioni] = useState([]);
  const [seguo, setSeguo] = useState(false);
  const [caricamento, setCaricamento] = useState(true);

  useEffect(() => {
    async function caricaTutto() {
      setCaricamento(true);
      try {
        const rispUtente = await api.get("/profilo/" + id);
        setUtente(rispUtente.data);

        const rispStat = await api.get("/profilo/" + id + "/statistiche");
        setStat(rispStat.data);

        const rispColl = await api.get("/profilo/" + id + "/collezione");
        setCollezione(rispColl.data);

        const rispRec = await api.get("/profilo/" + id + "/recensioni");
        setRecensioni(rispRec.data);

        const rispSeguo = await api.get("/profilo/" + id + "/seguo");
        setSeguo(rispSeguo.data);
      } catch {
        setUtente(null);
      } finally {
        setCaricamento(false);
      }
    }
    caricaTutto();
  }, [id]);

  async function segui() {
    try {
      await api.post("/seguiti/" + id);
      setSeguo(true);
    } catch {
      // ignoro
    }
  }

  async function smettiDiSeguire() {
    try {
      await api.delete("/seguiti/" + id);
      setSeguo(false);
    } catch {
      // ignoro
    }
  }

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner8bit />
      </Container>
    );
  }

  if (!utente) {
    return (
      <Container className="mt-4">
        <p>Utente non trovato.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: "800px" }}>
      <Card className="mb-4">
        <Card.Body className="d-flex align-items-center gap-3 flex-wrap">
          {utente.avatar ? (
            <img
              src={utente.avatar}
              alt="avatar"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              {(utente.nome || utente.username || "?").charAt(0).toUpperCase()}
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h3 className="mb-0">{utente.nome || utente.username}</h3>
            <p className="text-muted mb-0">@{utente.username}</p>
          </div>

          {utenteLoggato &&
            utenteLoggato.id !== parseInt(id) &&
            (seguo ? (
              <button
                type="button"
                className="btn-gamelog-danger"
                onClick={smettiDiSeguire}
              >
                Smetti di seguire
              </button>
            ) : (
              <button type="button" className="btn-gamelog" onClick={segui}>
                Segui
              </button>
            ))}
        </Card.Body>
      </Card>

      {stat && (
        <Row className="mb-4">
          <Col xs={4}>
            <Card className="text-center">
              <Card.Body>
                <h4>{stat.totaleGiochi}</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Giochi
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="text-center">
              <Card.Body>
                <h4>{stat.oreTotali}</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Ore
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="text-center">
              <Card.Body>
                <h4>{stat.votoMedio.toFixed(1)}</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Voto medio
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <h4 className="mb-3">Collezione</h4>
      {collezione.length === 0 ? (
        <p className="text-muted">Nessun gioco in collezione.</p>
      ) : (
        <Row className="mb-4">
          {collezione.map((voce) => (
            <Col key={voce.id} xs={6} md={3} className="mb-3">
              <Card
                className="h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/gioco/" + voce.gioco.idRawg)}
              >
                {voce.gioco.copertina && (
                  <Card.Img
                    variant="top"
                    src={voce.gioco.copertina}
                    style={{ height: "110px", objectFit: "cover" }}
                  />
                )}
                <Card.Body className="p-2">
                  <div style={{ fontSize: "0.85rem" }}>{voce.gioco.titolo}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <h4 className="mb-3">Recensioni</h4>
      {recensioni.length === 0 ? (
        <p className="text-muted">Nessuna recensione.</p>
      ) : (
        recensioni.map((rec) => (
          <Card key={rec.id} className="mb-2">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <strong>{rec.titoloGioco || "Gioco"}</strong>
                {rec.voto && (
                  <span style={{ color: "#ffc107" }}>{rec.voto}/10</span>
                )}
              </div>
              <p className="mb-0 mt-1">{rec.testo}</p>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default ProfiloUtente;
