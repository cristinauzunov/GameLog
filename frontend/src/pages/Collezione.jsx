import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import {
  Bookmark,
  PlayFill,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import api from "../api";
import "../collezione.css";
import Spinner8bit from "../components/Spinner8bit";

function Collezione() {
  const [voci, setVoci] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const [filtroStato, setFiltroStato] = useState("TUTTI");
  const [ordinamento, setOrdinamento] = useState("titolo");

  const [voceSelezionata, setVoceSelezionata] = useState(null);
  const [statoMod, setStatoMod] = useState("");
  const [votoMod, setVotoMod] = useState(0);
  const [oreMod, setOreMod] = useState("");
  const [noteMod, setNoteMod] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [ricerca, setRicerca] = useState("");

  const stati = [
    { codice: "DA_GIOCARE", etichetta: "Da giocare", icona: <Bookmark /> },
    { codice: "IN_CORSO", etichetta: "In corso", icona: <PlayFill /> },
    { codice: "FINITO", etichetta: "Finito", icona: <CheckCircleFill /> },
    { codice: "ABBANDONATO", etichetta: "Abbandonato", icona: <XCircleFill /> },
  ];

  const filtri = [
    { codice: "TUTTI", etichetta: "Tutti" },
    { codice: "DA_GIOCARE", etichetta: "Da giocare" },
    { codice: "IN_CORSO", etichetta: "In corso" },
    { codice: "FINITO", etichetta: "Finito" },
    { codice: "ABBANDONATO", etichetta: "Abbandonato" },
  ];

  async function seleziona(voce) {
    setMessaggio("");
    setVoceSelezionata(voce);
    setStatoMod(voce.stato);
    setVotoMod(voce.voto !== null ? voce.voto : 0);
    setOreMod(voce.oreGiocate !== null ? voce.oreGiocate : "");
    setNoteMod(voce.note !== null ? voce.note : "");

    setDescrizione("");
    try {
      const risposta = await api.get("/giochi/" + voce.gioco.idRawg);
      if (risposta.data && risposta.data.description_raw) {
        setDescrizione(risposta.data.description_raw);
      }
    } catch {
      setDescrizione("");
    }
  }

  useEffect(() => {
    async function caricaCollezione() {
      try {
        const risposta = await api.get("/collezione/mia");
        const lista = risposta.data;
        setVoci(lista);

        if (lista.length > 0) {
          const centrale = lista[Math.floor(lista.length / 2)];
          seleziona(centrale);
        }
      } catch {
        setErrore("Errore nel caricamento della collezione");
      } finally {
        setCaricamento(false);
      }
    }
    caricaCollezione();
  }, []);

  async function salvaModifica() {
    setMessaggio("");
    try {
      const risposta = await api.put("/collezione/" + voceSelezionata.id, {
        stato: statoMod,
        voto: votoMod > 0 ? votoMod : null,
        oreGiocate: oreMod !== "" ? parseInt(oreMod) : null,
        note: noteMod,
      });

      const aggiornata = risposta.data;

      const nuovaLista = [];
      for (let i = 0; i < voci.length; i++) {
        if (voci[i].id === aggiornata.id) {
          nuovaLista.push(aggiornata);
        } else {
          nuovaLista.push(voci[i]);
        }
      }
      setVoci(nuovaLista);
      setVoceSelezionata(aggiornata);
      setMessaggio("Modifiche salvate!");
    } catch {
      setErrore("Errore durante la modifica");
    }
  }

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner8bit />
      </Container>
    );
  }

  const vociFiltrate = [];
  for (let i = 0; i < voci.length; i++) {
    const passaStato = filtroStato === "TUTTI" || voci[i].stato === filtroStato;
    const titoloMinuscolo = voci[i].gioco.titolo.toLowerCase();
    const passaRicerca = titoloMinuscolo.indexOf(ricerca.toLowerCase()) !== -1;

    if (passaStato && passaRicerca) {
      vociFiltrate.push(voci[i]);
    }
  }

  const vociOrdinate = vociFiltrate.slice();
  vociOrdinate.sort(function (a, b) {
    if (ordinamento === "titolo") {
      return a.gioco.titolo.localeCompare(b.gioco.titolo);
    }
    if (ordinamento === "voto") {
      const votoA = a.voto !== null ? a.voto : 0;
      const votoB = b.voto !== null ? b.voto : 0;
      return votoB - votoA;
    }
    if (ordinamento === "ore") {
      const oreA = a.oreGiocate !== null ? a.oreGiocate : 0;
      const oreB = b.oreGiocate !== null ? b.oreGiocate : 0;
      return oreB - oreA;
    }
    return 0;
  });

  const stelline = [];
  for (let i = 1; i <= 10; i++) {
    stelline.push(
      <span
        key={i}
        onClick={() => setVotoMod(i)}
        style={{
          cursor: "pointer",
          fontSize: "1.6rem",
          color: i <= votoMod ? "#ffc107" : "#555",
        }}
      >
        ★
      </span>,
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">La mia collezione</h2>

      {errore && <p className="text-danger">{errore}</p>}

      {voci.length === 0 ? (
        <p>La tua collezione e ancora vuota.</p>
      ) : (
        <>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            {filtri.map((f) => (
              <button
                key={f.codice}
                type="button"
                className={
                  "btn-stato" + (filtroStato === f.codice ? " attivo" : "")
                }
                onClick={() => setFiltroStato(f.codice)}
              >
                {f.etichetta}
              </button>
            ))}

            <Form.Select
              style={{ maxWidth: "200px", marginLeft: "auto" }}
              value={ordinamento}
              onChange={(e) => setOrdinamento(e.target.value)}
            >
              <option value="titolo">Ordina per titolo</option>
              <option value="voto">Ordina per voto</option>
              <option value="ore">Ordina per ore giocate</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Cerca nella collezione..."
              style={{ maxWidth: "220px" }}
              value={ricerca}
              onChange={(e) => setRicerca(e.target.value)}
            />
          </div>

          {vociOrdinate.length === 0 ? (
            <p className="text-muted">Nessun gioco in questo stato.</p>
          ) : (
            <div className="collezione-fila">
              {vociOrdinate.map((voce) => (
                <div
                  key={voce.id}
                  className={
                    "collezione-card" +
                    (voceSelezionata && voceSelezionata.id === voce.id
                      ? " evidenza"
                      : "")
                  }
                  onClick={() => seleziona(voce)}
                >
                  {voce.gioco.copertina ? (
                    <img
                      src={voce.gioco.copertina}
                      alt={voce.gioco.titolo}
                      className="collezione-cover"
                    />
                  ) : (
                    <div className="collezione-cover collezione-cover-vuota">
                      {voce.gioco.titolo}
                    </div>
                  )}
                  <div className="collezione-card-titolo">
                    {voce.gioco.titolo}
                  </div>
                </div>
              ))}
            </div>
          )}

          {voceSelezionata && (
            <Card className="mt-3">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    {voceSelezionata.gioco.copertina && (
                      <img
                        src={voceSelezionata.gioco.copertina}
                        alt={voceSelezionata.gioco.titolo}
                        className="dettaglio-cover"
                      />
                    )}
                  </Col>

                  <Col md={8} className="mt-4 mt-md-0">
                    <h3>{voceSelezionata.gioco.titolo}</h3>
                    <p className="text-muted">
                      {voceSelezionata.gioco.piattaforma && (
                        <>Piattaforma: {voceSelezionata.gioco.piattaforma} · </>
                      )}
                      {voceSelezionata.gioco.genere && (
                        <>Genere: {voceSelezionata.gioco.genere} · </>
                      )}
                      Uscita: {voceSelezionata.gioco.dataUscita || "-"}
                    </p>

                    {descrizione && (
                      <p
                        style={{
                          whiteSpace: "pre-line",
                          lineHeight: "1.6",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {descrizione}
                      </p>
                    )}

                    {messaggio && (
                      <Alert variant="success" className="py-2">
                        {messaggio}
                      </Alert>
                    )}

                    <p className="mb-1 mt-3">Stato</p>
                    <div className="mb-3">
                      {stati.map((s) => (
                        <button
                          key={s.codice}
                          type="button"
                          className={
                            "btn-stato me-2 mb-2" +
                            (statoMod === s.codice ? " attivo" : "")
                          }
                          onClick={() => setStatoMod(s.codice)}
                        >
                          {s.icona} {s.etichetta}
                        </button>
                      ))}
                    </div>

                    <p className="mb-1">Voto</p>
                    <div className="mb-3">
                      {stelline}
                      {votoMod > 0 && (
                        <span className="ms-2">{votoMod}/10</span>
                      )}
                    </div>

                    <p className="mb-1">Ore giocate</p>
                    <Form.Control
                      type="number"
                      className="mb-3"
                      style={{ maxWidth: "150px" }}
                      value={oreMod}
                      onChange={(e) => setOreMod(e.target.value)}
                    />

                    <p className="mb-1">Note</p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-3"
                      value={noteMod}
                      onChange={(e) => setNoteMod(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn-gamelog me-2"
                      onClick={salvaModifica}
                    >
                      Salva modifiche
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
}

export default Collezione;
