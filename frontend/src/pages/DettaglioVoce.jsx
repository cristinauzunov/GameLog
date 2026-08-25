import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Spinner,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import {
  Bookmark,
  PlayFill,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import api from "../api";

function DettaglioVoce() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [voce, setVoce] = useState(null);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [mostraConferma, setMostraConferma] = useState(false);

  const [stato, setStato] = useState("");
  const [voto, setVoto] = useState(0);
  const [ore, setOre] = useState("");
  const [note, setNote] = useState("");

  const stati = [
    { codice: "DA_GIOCARE", etichetta: "Da giocare", icona: <Bookmark /> },
    { codice: "IN_CORSO", etichetta: "In corso", icona: <PlayFill /> },
    { codice: "FINITO", etichetta: "Finito", icona: <CheckCircleFill /> },
    { codice: "ABBANDONATO", etichetta: "Abbandonato", icona: <XCircleFill /> },
  ];

  useEffect(() => {
    async function carica() {
      try {
        const risposta = await api.get("/collezione/mia");
        let trovata = null;
        for (let i = 0; i < risposta.data.length; i++) {
          if (risposta.data[i].id === parseInt(id)) {
            trovata = risposta.data[i];
          }
        }

        if (trovata) {
          setVoce(trovata);
          setStato(trovata.stato);
          setVoto(trovata.voto !== null ? trovata.voto : 0);
          setOre(trovata.oreGiocate !== null ? trovata.oreGiocate : "");
          setNote(trovata.note !== null ? trovata.note : "");
        }
      } catch {
        setErrore("Errore nel caricamento");
      } finally {
        setCaricamento(false);
      }
    }
    carica();
  }, [id]);

  async function salva() {
    setMessaggio("");
    try {
      await api.put("/collezione/" + id, {
        stato: stato,
        voto: voto > 0 ? voto : null,
        oreGiocate: ore !== "" ? parseInt(ore) : null,
        note: note,
      });
      setMessaggio("Modifiche salvate!");
    } catch {
      setErrore("Errore durante il salvataggio");
    }
  }

  async function elimina() {
    try {
      await api.delete("/collezione/" + id);
      navigate("/collezione");
    } catch {
      setErrore("Errore durante l'eliminazione");
    }
  }

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!voce) {
    return (
      <Container className="mt-4">
        <p>Gioco non trovato in collezione.</p>
        <button
          type="button"
          className="btn-gamelog"
          onClick={() => navigate("/collezione")}
        >
          Torna alla collezione
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
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          {voce.gioco.copertina && (
            <img
              src={voce.gioco.copertina}
              alt={voce.gioco.titolo}
              className="img-fluid rounded mb-3"
            />
          )}
        </Col>

        <Col md={8} className="mt-4 mt-md-0">
          <h2>{voce.gioco.titolo}</h2>
          <p className="text-muted">
            {voce.gioco.piattaforma && (
              <>Piattaforma: {voce.gioco.piattaforma} · </>
            )}
            {voce.gioco.genere && <>Genere: {voce.gioco.genere} · </>}
            Uscita: {voce.gioco.dataUscita || "-"}
          </p>

          {messaggio && (
            <Alert variant="success" className="py-2">
              {messaggio}
            </Alert>
          )}
          {errore && (
            <Alert variant="danger" className="py-2">
              {errore}
            </Alert>
          )}

          <p className="mb-1 mt-3">Stato</p>
          <div className="mb-3">
            {stati.map((s) => (
              <button
                key={s.codice}
                type="button"
                className={
                  "btn-stato me-2 mb-2" + (stato === s.codice ? " attivo" : "")
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
            style={{ maxWidth: "150px" }}
            value={ore}
            onChange={(e) => setOre(e.target.value)}
          />

          <p className="mb-1">Note</p>
          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button type="button" className="btn-gamelog me-2" onClick={salva}>
            Salva modifiche
          </button>
          <button
            type="button"
            className="btn-gamelog-danger"
            onClick={() => setMostraConferma(true)}
          >
            Elimina dalla collezione
          </button>
        </Col>
      </Row>

      <Modal
        show={mostraConferma}
        onHide={() => setMostraConferma(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vuoi davvero eliminare <strong>{voce.gioco.titolo}</strong> dalla tua
          collezione? Questa azione non si puo annullare.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostraConferma(false)}>
            Annulla
          </Button>
          <button
            type="button"
            className="btn-gamelog-danger"
            onClick={elimina}
          >
            Elimina
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DettaglioVoce;
