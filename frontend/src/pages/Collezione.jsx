import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import api from "../api";

function Collezione() {
  const [voci, setVoci] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState("");

  // carico la collezione appena la pagina si apre
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
  }, []);

  // mentre carica mostro lo spinner
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
                    Voto: {voce.voto !== null ? voce.voto : "-"}
                    <br />
                    Ore giocate:{" "}
                    {voce.oreGiocate !== null ? voce.oreGiocate : "-"}
                    <br />
                    {voce.note && <span>Note: {voce.note}</span>}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Collezione;
