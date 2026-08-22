import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import api from "../api";

function DettaglioVoce() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [voce, setVoce] = useState(null);
    const [caricamento, setCaricamento] = useState(true);
    const [errore, setErrore] = useState("");
    const [messaggio, setMessaggio] = useState("");

    const [stato, setStato] = useState("");
    const [voto, setVoto] = useState(0);
    const [ore, setOre] = useState("");
    const [note, setNote] = useState("");

    const stati = ["DA_GIOCARE", "IN_CORSO", "FINITO", "ABBANDONATO"];

    // carico la collezione e trovo la voce con questo id
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
                note: note
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
                <Button onClick={() => navigate("/collezione")}>Torna alla collezione</Button>
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
                    color: i <= voto ? "#ffc107" : "#555"
                }}
            >
                ★
            </span>
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

                <Col md={8}>
                    <h2>{voce.gioco.titolo}</h2>
                    <p className="text-muted">
                        {voce.gioco.piattaforma && <>Piattaforma: {voce.gioco.piattaforma} · </>}
                        {voce.gioco.genere && <>Genere: {voce.gioco.genere} · </>}
                        Uscita: {voce.gioco.dataUscita || "-"}
                    </p>

                    {messaggio && <Alert variant="success" className="py-2">{messaggio}</Alert>}
                    {errore && <Alert variant="danger" className="py-2">{errore}</Alert>}

                    <p className="mb-1 mt-3">Stato</p>
                    <div className="mb-3">
                        {stati.map((s) => (
                            <Button
                                key={s}
                                variant={stato === s ? "primary" : "outline-primary"}
                                className="me-2 mb-2"
                                size="sm"
                                onClick={() => setStato(s)}
                            >
                                {s}
                            </Button>
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

                    <Button variant="success" className="me-2" onClick={salva}>
                        Salva modifiche
                    </Button>
                    <Button variant="outline-danger" onClick={elimina}>
                        Elimina dalla collezione
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DettaglioVoce;