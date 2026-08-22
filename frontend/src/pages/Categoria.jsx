import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import api from "../api";

// per mostrare il nome bello a partire dal codice
const nomiGeneri = {
    "action": "Azione",
    "role-playing-games-rpg": "RPG",
    "adventure": "Avventura",
    "shooter": "Sparatutto",
    "strategy": "Strategia",
    "puzzle": "Puzzle",
    "sports": "Sport"
};

function Categoria() {
    const { codice } = useParams();
    const navigate = useNavigate();

    const [giochi, setGiochi] = useState([]);
    const [caricamento, setCaricamento] = useState(true);

    useEffect(() => {
        async function carica() {
            try {
                const risposta = await api.get("/giochi/genere/" + codice);
                setGiochi(risposta.data);
            } catch {
                setGiochi([]);
            } finally {
                setCaricamento(false);
            }
        }
        carica();
    }, [codice]);

    if (caricamento) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    const nome = nomiGeneri[codice] || codice;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">{nome}</h2>

            {giochi.length === 0 ? (
                <p>Nessun gioco trovato per questa categoria.</p>
            ) : (
                <Row>
                    {giochi.map((gioco) => (
                        <Col key={gioco.id} md={3} className="mb-4">
                            <Card
                                className="h-100"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/gioco/" + gioco.id)}
                            >
                                {gioco.background_image ? (
                                    <Card.Img
                                        variant="top"
                                        src={gioco.background_image}
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                ) : null}
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "0.95rem" }}>
                                        {gioco.name}
                                    </Card.Title>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                                        {gioco.released || "-"}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Categoria;