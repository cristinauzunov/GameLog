import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Alert, Card } from "react-bootstrap";
import {
  Bookmark,
  PlayFill,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";
import { AuthContext } from "../context/AuthContext";

function DettaglioGioco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { caricaNumeroGiochi } = useContext(AuthContext);

  const [gioco, setGioco] = useState(null);
  const [caricamento, setCaricamento] = useState(true);

  const [stato, setStato] = useState("DA_GIOCARE");
  const [voto, setVoto] = useState(0);
  const [oreGiocate, setOreGiocate] = useState("");
  const [note, setNote] = useState("");
  const [errore, setErrore] = useState("");

  const stati = [
    { codice: "DA_GIOCARE", etichetta: "Da giocare", icona: <Bookmark /> },
    { codice: "IN_CORSO", etichetta: "In corso", icona: <PlayFill /> },
    { codice: "FINITO", etichetta: "Finito", icona: <CheckCircleFill /> },
    { codice: "ABBANDONATO", etichetta: "Abbandonato", icona: <XCircleFill /> },
  ];

  useEffect(() => {
    async function caricaGioco() {
      try {
        const risposta = await api.get("/giochi/" + id);
        setGioco(risposta.data);
      } catch {
        setErrore("Errore nel caricamento del gioco");
      } finally {
        setCaricamento(false);
      }
    }
    caricaGioco();
  }, [id]);

  async function aggiungi() {
    setErrore("");
    try {
      await api.post("/collezione", {
        idRawg: gioco.id,
        titolo: gioco.name,
        piattaforma: "",
        genere: "",
        dataUscita: gioco.released ? gioco.released : "",
        copertina: gioco.background_image ? gioco.background_image : "",
        stato: stato,
        voto: voto > 0 ? voto : null,
        oreGiocate: oreGiocate !== "" ? parseInt(oreGiocate) : null,
        note: note,
      });
      caricaNumeroGiochi();
      navigate("/");
    } catch {
      setErrore("Errore durante l'aggiunta alla collezione");
    }
  }

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner8bit />
      </Container>
    );
  }

  if (!gioco) {
    return (
      <Container className="mt-4">
        <p>Gioco non trovato.</p>
        <button
          type="button"
          className="btn-gamelog"
          onClick={() => navigate("/cerca")}
        >
          Torna alla ricerca
        </button>
      </Container>
    );
  }

  const stelline = [];
  for (let i = 1; i <= 10; i++) {
    stelline.push(
      <span
        key={i}
        onClick={() => setVoto(i)}
        style={{
          cursor: "pointer",
          fontSize: "1.6rem",
          color: i <= voto ? "#ffc107" : "#555",
        }}
      >
        ★
      </span>,
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <Row className="align-items-start">
        <Col md={4}>
          <div style={{ position: "sticky", top: "20px" }}>
            {gioco.background_image && (
              <img
                src={gioco.background_image}
                alt={gioco.name}
                className="img-fluid rounded mb-3"
              />
            )}

            <Card>
              <Card.Body>
                <h6>Aggiungi alla collezione</h6>

                {errore && <Alert variant="danger">{errore}</Alert>}

                <p className="mb-1 mt-3">Stato</p>
                <div className="mb-3">
                  {stati.map((s) => (
                    <button
                      key={s.codice}
                      type="button"
                      className={
                        "btn-stato me-2 mb-2" +
                        (stato === s.codice ? " attivo" : "")
                      }
                      onClick={() => setStato(s.codice)}
                    >
                      {s.icona} {s.etichetta}
                    </button>
                  ))}
                </div>

                <p className="mb-1">Voto</p>
                <div className="mb-3">
                  {stelline}
                  {voto > 0 && <span className="ms-2">{voto}/10</span>}
                </div>

                <p className="mb-1">Ore giocate</p>
                <Form.Control
                  type="number"
                  className="mb-3"
                  value={oreGiocate}
                  onChange={(e) => setOreGiocate(e.target.value)}
                />

                <p className="mb-1">Note</p>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <button
                  type="button"
                  className="btn-gamelog w-100"
                  onClick={aggiungi}
                >
                  Aggiungi alla collezione
                </button>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={8} className="mt-4 mt-md-0">
          <h2>{gioco.name}</h2>
          <p className="text-muted">
            Uscita: {gioco.released ? gioco.released : "-"}
          </p>
          {gioco.description_raw && (
            <p style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
              {gioco.description_raw}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DettaglioGioco;
