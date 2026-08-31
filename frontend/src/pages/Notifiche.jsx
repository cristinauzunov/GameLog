import { useState, useEffect, useContext } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Notifiche() {
  const { caricaNonLette } = useContext(AuthContext);
  const [notifiche, setNotifiche] = useState([]);
  const [caricamento, setCaricamento] = useState(true);

  useEffect(() => {
    async function carica() {
      try {
        const risposta = await api.get("/notifiche/mie");
        setNotifiche(risposta.data);
        await api.put("/notifiche/lette");
        if (caricaNonLette) {
          caricaNonLette();
        }
      } catch {
        setNotifiche([]);
      } finally {
        setCaricamento(false);
      }
    }
    carica();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  function avatarDi(u) {
    if (u && u.avatar) {
      return (
        <img
          src={u.avatar}
          alt="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        {u ? (u.nome || u.username || "?").charAt(0).toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Notifiche</h2>

      {notifiche.length === 0 ? (
        <p className="text-muted">Non hai notifiche.</p>
      ) : (
        notifiche.map((n) => (
          <Card key={n.id} className="mb-2">
            <Card.Body className="d-flex align-items-center gap-3">
              {avatarDi(n.mittente)}
              <div>
                <div>{n.testo}</div>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {n.dataCreazione}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Notifiche;
