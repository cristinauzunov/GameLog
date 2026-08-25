import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import "../auth.css";
import { Google, Discord, Twitch } from "react-bootstrap-icons";

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
        password: password,
      });
      login(risposta.data.token);
      navigate("/");
    } catch {
      setErrore("Email o password non validi");
    }
  }

  return (
    <div className="auth-container">
      <div className="aurora-bg"></div>

      <div className="auth-form">
        <h1 className="mb-1">GameLog</h1>
        <p className="text-muted mb-4">Accedi al tuo account</p>

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
          Non hai un account? <Link to="/registrazione">Registrati</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
