import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import api from "../api";

function Cerca() {
  const [titolo, setTitolo] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [caricamento, setCaricamento] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // aspetto 400ms dopo l'ultima lettera prima di cercare
    const timer = setTimeout(() => {
      cercaGiochi();
    }, 100);

    // se l'utente scrive ancora, annullo la ricerca precedente
    return () => clearTimeout(timer);

    async function cercaGiochi() {
      // se il campo e vuoto, svuoto i risultati e non cerco
      if (titolo.trim() === "") {
        setRisultati([]);
        return;
      }

      setCaricamento(true);
      try {
        const risposta = await api.get("/giochi/cerca?titolo=" + titolo);
        setRisultati(risposta.data);
      } catch {
        setRisultati([]);
      } finally {
        setCaricamento(false);
      }
    }
  }, [titolo]);
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Cerca giochi</h2>

      <Form.Control
        type="text"
        placeholder="Scrivi il titolo di un gioco..."
        value={titolo}
        onChange={(e) => setTitolo(e.target.value)}
        className="mb-4"
      />

      {caricamento && (
        <div className="text-center mt-3 mb-3">
          <Spinner animation="border" />
        </div>
      )}

      <Row>
        {risultati.map((gioco) => (
          <Col key={gioco.id} md={4} className="mb-4">
            <Card
              onClick={() => navigate("/gioco/" + gioco.id)}
              style={{ cursor: "pointer" }}
              className="h-100"
            >
              {gioco.background_image && (
                <Card.Img
                  variant="top"
                  src={gioco.background_image}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{gioco.name}</Card.Title>
                <Card.Text>
                  Uscita: {gioco.released ? gioco.released : "-"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cerca;
