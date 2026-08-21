import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../api";
import SfondoGiochi from "../components/SfondoGiochi";
import "../auth.css";
import { Google, Discord, Twitch } from "react-bootstrap-icons";

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
        avatar: "",
      });
      navigate("/login");
    } catch {
      setErrore(
        "Errore durante la registrazione (email o username gia in uso)",
      );
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="mb-1">GameLog</h1>
        <p className="text-muted mb-4">Crea il tuo account</p>

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
        <div className="auth-divisore">
          <span>oppure</span>
        </div>

        <div className="auth-social">
          <button type="button" className="auth-social-btn">
            <Google />
          </button>
          <button type="button" className="auth-social-btn">
            <Discord />
          </button>
          <button type="button" className="auth-social-btn">
            <Twitch />
          </button>
        </div>

        <p className="mt-3">
          Hai gia un account? <Link to="/login">Accedi</Link>
        </p>
      </div>

      <SfondoGiochi />
    </div>
  );
}

export default Registrazione;
