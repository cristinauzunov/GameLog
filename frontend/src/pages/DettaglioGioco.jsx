import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Alert, Card } from "react-bootstrap";
import {
  Bookmark,
  PlayFill,
  CheckCircleFill,
  XCircleFill,
  Trash,
  Pencil,
} from "react-bootstrap-icons";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";
import { AuthContext } from "../context/AuthContext";
import "../home.css";

function DettaglioGioco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { utente, caricaNumeroGiochi } = useContext(AuthContext);

  const [gioco, setGioco] = useState(null);
  const [screenshot, setScreenshot] = useState([]);
  const [simili, setSimili] = useState([]);
  const [video, setVideo] = useState([]);
  const [caricamento, setCaricamento] = useState(true);

  const [stato, setStato] = useState("DA_GIOCARE");
  const [voto, setVoto] = useState(0);
  const [oreGiocate, setOreGiocate] = useState("");
  const [note, setNote] = useState("");
  const [errore, setErrore] = useState("");

  const [recensioni, setRecensioni] = useState([]);
  const [testoRec, setTestoRec] = useState("");
  const [votoRec, setVotoRec] = useState(0);

  const [recInModifica, setRecInModifica] = useState(null);
  const [testoModifica, setTestoModifica] = useState("");
  const [votoModifica, setVotoModifica] = useState(0);

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

  useEffect(() => {
    async function caricaScreenshot() {
      try {
        const risposta = await api.get("/giochi/" + id + "/screenshot");
        setScreenshot(risposta.data);
      } catch {
        setScreenshot([]);
      }
    }
    caricaScreenshot();
  }, [id]);

  useEffect(() => {
    async function caricaSimili() {
      try {
        const risposta = await api.get("/giochi/" + id + "/simili");
        setSimili(risposta.data);
      } catch {
        setSimili([]);
      }
    }
    caricaSimili();
  }, [id]);

  useEffect(() => {
    async function caricaVideo() {
      try {
        const risposta = await api.get("/giochi/" + id + "/video");
        setVideo(risposta.data);
      } catch {
        setVideo([]);
      }
    }
    caricaVideo();
  }, [id]);

  useEffect(() => {
    caricaRecensioni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function caricaRecensioni() {
    try {
      const risposta = await api.get("/recensioni/gioco/" + id);
      setRecensioni(risposta.data);
    } catch {
      setRecensioni([]);
    }
  }

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

  async function inviaRecensione() {
    if (testoRec.trim() === "") {
      return;
    }
    try {
      await api.post("/recensioni", {
        idRawg: parseInt(id),
        titoloGioco: gioco.name,
        testo: testoRec,
        voto: votoRec > 0 ? votoRec : null,
      });
      setTestoRec("");
      setVotoRec(0);
      caricaRecensioni();
    } catch {
      setErrore("Errore durante la pubblicazione della recensione");
    }
  }

  async function eliminaRecensione(idRec) {
    try {
      await api.delete("/recensioni/" + idRec);
      caricaRecensioni();
    } catch {
      setErrore("Errore durante l'eliminazione della recensione");
    }
  }

  function iniziaModifica(rec) {
    setRecInModifica(rec.id);
    setTestoModifica(rec.testo);
    setVotoModifica(rec.voto !== null ? rec.voto : 0);
  }

  async function salvaModificaRec(idRec) {
    try {
      await api.put("/recensioni/" + idRec, {
        testo: testoModifica,
        voto: votoModifica > 0 ? votoModifica : null,
      });
      setRecInModifica(null);
      caricaRecensioni();
    } catch {
      setErrore("Errore durante la modifica della recensione");
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
          <h2 className="mb-2">{gioco.name}</h2>

          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            {gioco.metacritic && (
              <span
                style={{
                  backgroundColor:
                    gioco.metacritic >= 75
                      ? "#198754"
                      : gioco.metacritic >= 50
                        ? "#c9a227"
                        : "#dc3545",
                  color: "#fff",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                Metacritic {gioco.metacritic}
              </span>
            )}
            {gioco.rating > 0 && (
              <span style={{ color: "#ffc107" }}>
                ★ {gioco.rating.toFixed(1)}/5
              </span>
            )}
            <span className="text-muted">
              Uscita: {gioco.released ? gioco.released : "-"}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            {gioco.genres && gioco.genres.length > 0 && (
              <p className="mb-2">
                <span className="text-muted">Generi</span>
                <br />
                {gioco.genres.map((g) => g.name).join(", ")}
              </p>
            )}
            {gioco.platforms && gioco.platforms.length > 0 && (
              <p className="mb-2">
                <span className="text-muted">Piattaforme</span>
                <br />
                {gioco.platforms.map((p) => p.platform.name).join(", ")}
              </p>
            )}
            {gioco.developers && gioco.developers.length > 0 && (
              <p className="mb-0">
                <span className="text-muted">Sviluppatore</span>
                <br />
                {gioco.developers.map((d) => d.name).join(", ")}
              </p>
            )}
          </div>

          {video.length > 0 && (
            <>
              <h5 className="mb-2">Trailer</h5>
              <video
                controls
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "24px",
                }}
                src={video[0]}
              >
                Il tuo browser non supporta il video.
              </video>
            </>
          )}

          {gioco.description_raw && (
            <>
              <h5 className="mb-2">Descrizione</h5>
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
                {gioco.description_raw}
              </p>
            </>
          )}

          {screenshot.length > 0 && (
            <>
              <h5 className="mb-2 mt-4">Immagini</h5>
              <div className="screenshot-galleria">
                {screenshot.map((img, indice) => (
                  <img
                    key={indice}
                    src={img}
                    alt={"screenshot " + (indice + 1)}
                    className="screenshot-img"
                  />
                ))}
              </div>
            </>
          )}

          {simili.length > 0 && (
            <>
              <h5 className="mb-2 mt-4">Giochi simili</h5>
              <div className="fila-giochi">
                {simili.map((g) => (
                  <div
                    key={g.id}
                    className="fila-card"
                    onClick={() => navigate("/gioco/" + g.id)}
                  >
                    {g.background_image ? (
                      <img
                        src={g.background_image}
                        alt={g.name}
                        className="fila-cover"
                      />
                    ) : (
                      <div className="fila-cover fila-cover-vuota">
                        {g.name}
                      </div>
                    )}
                    <div className="fila-titolo">{g.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <hr className="my-4" />
          <h4 className="mb-3">Recensioni</h4>

          <div className="mb-4">
            <p className="mb-1">Il tuo voto</p>
            <div className="mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <span
                  key={n}
                  onClick={() => setVotoRec(n)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.4rem",
                    color: n <= votoRec ? "#ffc107" : "#555",
                  }}
                >
                  ★
                </span>
              ))}
              {votoRec > 0 && <span className="ms-2">{votoRec}/10</span>}
            </div>

            <Form.Control
              as="textarea"
              rows={3}
              className="mb-2"
              placeholder="Scrivi una recensione..."
              value={testoRec}
              onChange={(e) => setTestoRec(e.target.value)}
            />
            <button
              type="button"
              className="btn-gamelog"
              onClick={inviaRecensione}
            >
              Pubblica recensione
            </button>
          </div>

          {recensioni.length === 0 ? (
            <p className="text-muted">
              Nessuna recensione ancora. Scrivi la prima!
            </p>
          ) : (
            recensioni.map((rec) => (
              <Card key={rec.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/utente/" + rec.utente.id)}
                    >
                      {rec.utente.avatar ? (
                        <img
                          src={rec.utente.avatar}
                          alt="avatar"
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            flexShrink: 0,
                          }}
                        >
                          {(rec.utente.nome || rec.utente.username || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                      <div>
                        <strong>
                          {rec.utente.nome || rec.utente.username}
                        </strong>
                        {rec.voto && (
                          <span className="ms-2" style={{ color: "#ffc107" }}>
                            {rec.voto}/10
                          </span>
                        )}
                        <span
                          className="text-muted ms-2"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {rec.dataCreazione}
                        </span>
                      </div>
                    </div>

                    {utente &&
                      rec.utente.id === utente.id &&
                      recInModifica !== rec.id && (
                        <div className="d-flex gap-3">
                          <Pencil
                            style={{ cursor: "pointer", color: "#9ca3af" }}
                            onClick={() => iniziaModifica(rec)}
                          />
                          <Trash
                            style={{ cursor: "pointer", color: "#dc3545" }}
                            onClick={() => eliminaRecensione(rec.id)}
                          />
                        </div>
                      )}
                  </div>

                  {recInModifica === rec.id ? (
                    <div className="mt-2">
                      <div className="mb-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <span
                            key={n}
                            onClick={() => setVotoModifica(n)}
                            style={{
                              cursor: "pointer",
                              fontSize: "1.3rem",
                              color: n <= votoModifica ? "#ffc107" : "#555",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="mb-2"
                        value={testoModifica}
                        onChange={(e) => setTestoModifica(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-gamelog-sm me-2"
                        onClick={() => salvaModificaRec(rec.id)}
                      >
                        Salva
                      </button>
                      <button
                        type="button"
                        className="btn-gamelog-danger-sm"
                        onClick={() => setRecInModifica(null)}
                      >
                        Annulla
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 mb-0">{rec.testo}</p>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DettaglioGioco;
