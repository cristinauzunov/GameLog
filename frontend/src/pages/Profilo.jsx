import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Profilo() {
    const { aggiornaUtente } = useContext(AuthContext);

    const [utente, setUtente] = useState(null);
    const [caricamento, setCaricamento] = useState(true);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [passwordAttuale, setPasswordAttuale] = useState("");
    const [passwordNuova, setPasswordNuova] = useState("");

    const [messaggio, setMessaggio] = useState("");
    const [errore, setErrore] = useState("");

    useEffect(() => {
        async function carica() {
            try {
                const risposta = await api.get("/auth/me");
                setUtente(risposta.data);
                setNome(risposta.data.nome || "");
                setEmail(risposta.data.email || "");
                setAvatar(risposta.data.avatar || "");
            } catch {
                setErrore("Errore nel caricamento del profilo");
            } finally {
                setCaricamento(false);
            }
        }
        carica();
    }, []);

    function caricaImmagine(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function () {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    }

    async function salva() {
        setMessaggio("");
        setErrore("");
        try {
            const risposta = await api.put("/auth/me", {
                nome: nome,
                email: email,
                avatar: avatar,
                passwordAttuale: passwordAttuale,
                passwordNuova: passwordNuova
            });
            setUtente(risposta.data);
            aggiornaUtente(risposta.data);
            setEmail(risposta.data.email || "");
            setPasswordAttuale("");
            setPasswordNuova("");
            setMessaggio("Profilo aggiornato!");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrore(err.response.data.message);
            } else {
                setErrore("Errore durante il salvataggio");
            }
        }
    }

    if (caricamento) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!utente) {
        return (
            <Container className="mt-4">
                <p className="text-danger">{errore}</p>
            </Container>
        );
    }

    let iniziale = "?";
    if (utente.nome && utente.nome.length > 0) {
        iniziale = utente.nome.charAt(0).toUpperCase();
    } else if (utente.username && utente.username.length > 0) {
        iniziale = utente.username.charAt(0).toUpperCase();
    }

    return (
        <Container className="mt-4" style={{ maxWidth: "700px" }}>
            <h2 className="mb-4">Il mio profilo</h2>

            {messaggio && <Alert variant="success">{messaggio}</Alert>}
            {errore && <Alert variant="danger">{errore}</Alert>}

            <Card className="mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        backgroundColor: "#4f46e5",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "2rem",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {iniziale}
                                </div>
                            )}
                        </Col>
                        <Col>
                            <h4 className="mb-0">{utente.username}</h4>
                            <p className="text-muted mb-0">{utente.email}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <h5 className="mb-3">Modifica profilo</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Avatar (URL immagine)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="https://..."
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> carica un'immagine</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={caricaImmagine}
                        />
                    </Form.Group>

                    <hr />
                    <h6 className="mb-3">Cambia password</h6>

                    <Form.Group className="mb-3">
                        <Form.Label>Password attuale</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Necessaria per cambiare password"
                            value={passwordAttuale}
                            onChange={(e) => setPasswordAttuale(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nuova password</Form.Label>
                        <Form.Control
                            type="password"
                            
                            value={passwordNuova}
                            onChange={(e) => setPasswordNuova(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="btn-gamelog" onClick={salva}>
                        Salva modifiche
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profilo;