import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import api from "../api";
import "../collezione.css";

function Collezione() {
    const [voci, setVoci] = useState([]);
    const [caricamento, setCaricamento] = useState(true);
    const [errore, setErrore] = useState("");
    const [messaggio, setMessaggio] = useState("");

    // gioco attualmente selezionato + campi modificabili
    const [voceSelezionata, setVoceSelezionata] = useState(null);
    const [statoMod, setStatoMod] = useState("");
    const [votoMod, setVotoMod] = useState(0);
    const [oreMod, setOreMod] = useState("");
    const [noteMod, setNoteMod] = useState("");
    const [descrizione, setDescrizione] = useState("");

    const stati = ["DA_GIOCARE", "IN_CORSO", "FINITO", "ABBANDONATO"];

    // quando clicco una card, la seleziono e riempio i campi
    async function seleziona(voce) {
        setMessaggio("");
        setVoceSelezionata(voce);
        setStatoMod(voce.stato);
        setVotoMod(voce.voto !== null ? voce.voto : 0);
        setOreMod(voce.oreGiocate !== null ? voce.oreGiocate : "");
        setNoteMod(voce.note !== null ? voce.note : "");

        // recupero la descrizione da RAWG usando l'idRawg del gioco
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

                // seleziono la card centrale, cosi una e subito in evidenza
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

    // salvo le modifiche del gioco selezionato
    async function salvaModifica() {
        setMessaggio("");
        try {
            const risposta = await api.put("/collezione/" + voceSelezionata.id, {
                stato: statoMod,
                voto: votoMod > 0 ? votoMod : null,
                oreGiocate: oreMod !== "" ? parseInt(oreMod) : null,
                note: noteMod
            });

            const aggiornata = risposta.data;

            // aggiorno la voce dentro la lista, senza ricaricare tutto
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
                <Spinner animation="border" />
            </Container>
        );
    }

    // stelline cliccabili per il voto
    const stelline = [];
    for (let i = 1; i <= 10; i++) {
        stelline.push(
            <span
                key={i}
                onClick={() => setVotoMod(i)}
                style={{
                    cursor: "pointer",
                    fontSize: "1.6rem",
                    color: i <= votoMod ? "#ffc107" : "#555"
                }}
            >
                ★
            </span>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-2">La mia collezione</h2>

            {errore && <p className="text-danger">{errore}</p>}

            {voci.length === 0 ? (
                <p>La tua collezione e ancora vuota.</p>
            ) : (
                <>
                    {/* FILA ORIZZONTALE */}
                    <div className="collezione-fila">
                        {voci.map((voce) => (
                            <div
                                key={voce.id}
                                className={
                                    "collezione-card" +
                                    (voceSelezionata && voceSelezionata.id === voce.id ? " evidenza" : "")
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
                                <div className="collezione-card-titolo">{voce.gioco.titolo}</div>
                            </div>
                        ))}
                    </div>

                    {/* PANNELLO DETTAGLI SOTTO */}
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

                                    <Col md={8}>
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
                                            <p style={{ whiteSpace: "pre-line", lineHeight: "1.6", maxHeight: "200px", overflowY: "auto" }}>
                                                {descrizione}
                                            </p>
                                        )}

                                        {messaggio && <Alert variant="success" className="py-2">{messaggio}</Alert>}

                                        <p className="mb-1 mt-3">Stato</p>
                                        <div className="mb-3">
                                            {stati.map((s) => (
                                                <Button
                                                    key={s}
                                                    variant={statoMod === s ? "primary" : "outline-primary"}
                                                    className="me-2 mb-2"
                                                    size="sm"
                                                    onClick={() => setStatoMod(s)}
                                                >
                                                    {s}
                                                </Button>
                                            ))}
                                        </div>

                                        <p className="mb-1">Voto</p>
                                        <div className="mb-3">
                                            {stelline}
                                            {votoMod > 0 && <span className="ms-2">{votoMod}/10</span>}
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

                                        <Button variant="success" onClick={salvaModifica}>
                                            Salva modifiche
                                        </Button>
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