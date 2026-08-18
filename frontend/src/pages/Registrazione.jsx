import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import api from "../api";

function Registrazione() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [errore, setErrore] = useState("");

    const navigate = useNavigate();

    async function inviaRegistrazione(e) {
        e.preventDefault();
        setErrore("");

        try {
            await api.post("/auth/register", {
                username: username,
                email: email,
                password: password,
                nome: nome,
                avatar: ""
            });
            navigate("/login");
        } catch {
            setErrore("Errore durante la registrazione (email o username gia in uso)");
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Registrati a GameLog</h2>

            {errore && <Alert variant="danger">{errore}</Alert>}

            <Form onSubmit={inviaRegistrazione}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                    Registrati
                </Button>
            </Form>
        </Container>
    );
}

export default Registrazione;