import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errore, setErrore] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function inviaLogin(e) {
        e.preventDefault();
        setErrore("");

        try {
            const risposta = await api.post("/auth/login", {
                email: email,
                password: password
            });
            // salvo il token nel context e vado alla home
            login(risposta.data.token);
            navigate("/");
        } catch {
            setErrore("Email o password non validi");
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Accedi a GameLog</h2>

            {errore && <Alert variant="danger">{errore}</Alert>}

            <Form onSubmit={inviaLogin}>
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

                <Button type="submit" variant="primary" className="w-100">
                    Accedi
                </Button>
            </Form>
        </Container>
    );
}

export default Login;