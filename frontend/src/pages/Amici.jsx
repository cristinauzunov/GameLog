import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import api from "../api";

function Amici() {
  const [utenti, setUtenti] = useState([]);
  const [seguiti, setSeguiti] = useState([]);
  const [follower, setFollower] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [vista, setVista] = useState("tutti");

  useEffect(() => {
    caricaTutto();
  }, []);

  async function caricaTutto() {
    try {
      const rispUtenti = await api.get("/seguiti/utenti");
      setUtenti(rispUtenti.data);

      const rispSeguiti = await api.get("/seguiti/miei");
      setSeguiti(rispSeguiti.data);

      const rispFollower = await api.get("/seguiti/follower");
      setFollower(rispFollower.data);
    } catch {
      // ignoro
    } finally {
      setCaricamento(false);
    }
  }

  function seguoGia(idUtente) {
    for (let i = 0; i < seguiti.length; i++) {
      if (seguiti[i].id === idUtente) {
        return true;
      }
    }
    return false;
  }

  async function segui(idUtente) {
    try {
      await api.post("/seguiti/" + idUtente);
      caricaTutto();
    } catch {
      // ignoro
    }
  }

  async function smettiDiSeguire(idUtente) {
    try {
      await api.delete("/seguiti/" + idUtente);
      caricaTutto();
    } catch {
      // ignoro
    }
  }

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  function avatarDi(u) {
    if (u.avatar) {
      return (
        <img
          src={u.avatar}
          alt="avatar"
          style={{
            width: "44px",
            height: "44px",
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
          width: "44px",
          height: "44px",
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
        {(u.nome || u.username || "?").charAt(0).toUpperCase()}
      </div>
    );
  }

  function rigaUtente(u) {
    return (
      <Card key={u.id} className="mb-2">
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            {avatarDi(u)}
            <div>
              <strong>{u.nome || u.username}</strong>
              <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                @{u.username}
              </div>
            </div>
          </div>

          {seguoGia(u.id) ? (
            <button
              type="button"
              className="btn-gamelog-danger-sm"
              onClick={() => smettiDiSeguire(u.id)}
            >
              Smetti di seguire
            </button>
          ) : (
            <button
              type="button"
              className="btn-gamelog-sm"
              onClick={() => segui(u.id)}
            >
              Segui
            </button>
          )}
        </Card.Body>
      </Card>
    );
  }

  let listaMostrata = utenti;
  let titoloLista = "Scopri nuovi utenti";
  if (vista === "seguiti") {
    listaMostrata = seguiti;
    titoloLista = "Persone che segui";
  } else if (vista === "follower") {
    listaMostrata = follower;
    titoloLista = "I tuoi follower";
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Amici</h2>

      <Row>
        <Col md={4} className="mb-3">
          <Card
            className={
              "text-center" + (vista === "tutti" ? " border-primary" : "")
            }
            style={{ cursor: "pointer" }}
            onClick={() => setVista("tutti")}
          >
            <Card.Body>
              <h3>{utenti.length}</h3>
              <p className="text-muted mb-0">Scopri</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card
            className={
              "text-center" + (vista === "seguiti" ? " border-primary" : "")
            }
            style={{ cursor: "pointer" }}
            onClick={() => setVista("seguiti")}
          >
            <Card.Body>
              <h3>{seguiti.length}</h3>
              <p className="text-muted mb-0">Seguiti</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card
            className={
              "text-center" + (vista === "follower" ? " border-primary" : "")
            }
            style={{ cursor: "pointer" }}
            onClick={() => setVista("follower")}
          >
            <Card.Body>
              <h3>{follower.length}</h3>
              <p className="text-muted mb-0">Follower</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mt-4 mb-3">{titoloLista}</h4>

      {listaMostrata.length === 0 ? (
        <p className="text-muted">ancora nessun follower</p>
      ) : (
        listaMostrata.map((u) => rigaUtente(u))
      )}
    </Container>
  );
}

export default Amici;
