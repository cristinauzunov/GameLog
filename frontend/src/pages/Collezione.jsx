import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner, Button, Modal, Form } from "react-bootstrap";
import api from "../api";

function Collezione() {
    const [voci, setVoci] = useState([]);
    const [caricamento, setCaricamento] = useState(true);
    const [errore, setErrore] = useState("");
    const [refresh, setRefresh] = useState(0);

    const [voceInModifica, setVoceInModifica] = useState(null);
    const [statoMod, setStatoMod] = useState("");
    const [votoMod, setVotoMod] = useState(0);
    const [oreMod, setOreMod] = useState("");
    const [noteMod, setNoteMod] = useState("");

    const stati = ["DA_GIOCARE", "IN_CORSO", "FINITO", "ABBANDONATO"];

    useEffect(() => {
        async function caricaCollezione() {
            try {
                const risposta = await api.get("/collezione/mia");
                setVoci(risposta.data);
            } catch {
                setErrore("Errore nel caricamento della collezione");
            } finally {
                setCaricamento(false);
            }
        }
        caricaCollezione();
    }, [refresh]);

    async function elimina(id) {
        try {
            await api.delete("/collezione/" + id);
            setRefresh(refresh + 1);
        } catch {
            setErrore("Errore durante l'eliminazione");
        }
    }

    function apriModifica(voce) {
        setVoceInModifica(voce);
        setStatoMod(voce.stato);
        setVotoMod(voce.voto !== null ? voce.voto : 0);
        setOreMod(voce.oreGiocate !== null ? voce.oreGiocate : "");
        setNoteMod(voce.note !== null ? voce.note : "");
    }

    async function salvaModifica() {
        try {
            await api.put("/collezione/" + voceInModifica.id, {
                stato: statoMod,
                voto: votoMod > 0 ? votoMod : null,
                oreGiocate: oreMod !== "" ? parseInt(oreMod) : null,
                note: noteMod
            });
            setVoceInModifica(null);
            setRefresh(refresh + 1);
        } catch {
            setErrore("Errore durante la modifica");
        }
    }

    const stelline = [];
    for (let i = 1; i <= 10; i++) {
        stelline.push(
            <span
                key={i}
                onClick={() => setVotoMod(i)}
                style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: i <= votoMod ? "#ffc107" : "#555"
                }}
            >
                ★
            </span>
        );
    }

    if (caricamento) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">La mia collezione</h2>

            {errore && <p className="text-danger">{errore}</p>}

            {voci.length === 0 ? (
                <p>La tua collezione e ancora vuota.</p>
            ) : (
                <Row>
                    {voci.map((voce) => (
                        <Col key={voce.id} md={4} className="mb-4">
                            <Card className="h-100">
                                {voce.gioco.copertina && (
                                    <Card.Img
                                        variant="top"
                                        src={voce.gioco.copertina}
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{voce.gioco.titolo}</Card.Title>
                                    <Badge bg="secondary" className="mb-2">
                                        {voce.stato}
                                    </Badge>
                                    <Card.Text className="mt-2">
                                        Voto: {voce.voto !== null ? voce.voto : "-"}<br />
                                        Ore giocate: {voce.oreGiocate !== null ? voce.oreGiocate : "-"}<br />
                                        {voce.note && <span>Note: {voce.note}</span>}
                                    </Card.Text>

                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => apriModifica(voce)}
                                    >
                                        Modifica
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => elimina(voce.id)}
                                    >
                                        Elimina
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={voceInModifica !== null} onHide={() => setVoceInModifica(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modifica {voceInModifica ? voceInModifica.gioco.titolo : ""}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-1">Stato</p>
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
                        value={noteMod}
                        onChange={(e) => setNoteMod(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setVoceInModifica(null)}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={salvaModifica}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Collezione;