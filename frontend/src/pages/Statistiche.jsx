import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Badge } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../api";

function Statistiche() {
  const [stat, setStat] = useState(null);
  const [voci, setVoci] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState("");
  const [statoScelto, setStatoScelto] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function caricaTutto() {
      try {
        const rispStat = await api.get("/collezione/statistiche");
        setStat(rispStat.data);

        const rispVoci = await api.get("/collezione/mia");
        setVoci(rispVoci.data);
      } catch {
        setErrore("Errore nel caricamento delle statistiche");
      } finally {
        setCaricamento(false);
      }
    }
    caricaTutto();
  }, []);

  if (caricamento) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (errore) {
    return (
      <Container className="mt-4">
        <p className="text-danger">{errore}</p>
      </Container>
    );
  }

  const datiGrafico = [
    {
      nome: "Da giocare",
      codice: "DA_GIOCARE",
      valore: stat.daGiocare,
      colore: "#6c757d",
    },
    {
      nome: "In corso",
      codice: "IN_CORSO",
      valore: stat.inCorso,
      colore: "#0dcaf0",
    },
    {
      nome: "Finito",
      codice: "FINITO",
      valore: stat.finito,
      colore: "#198754",
    },
    {
      nome: "Abbandonato",
      codice: "ABBANDONATO",
      valore: stat.abbandonato,
      colore: "#dc3545",
    },
  ];

  const datiFiltrati = [];
  for (let i = 0; i < datiGrafico.length; i++) {
    if (datiGrafico[i].valore > 0) {
      datiFiltrati.push(datiGrafico[i]);
    }
  }

  const giochiFiltrati = [];
  for (let i = 0; i < voci.length; i++) {
    if (voci[i].stato === statoScelto) {
      giochiFiltrati.push(voci[i]);
    }
  }

  let nomeStatoScelto = "";
  for (let i = 0; i < datiGrafico.length; i++) {
    if (datiGrafico[i].codice === statoScelto) {
      nomeStatoScelto = datiGrafico[i].nome;
    }
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Le mie statistiche</h2>

      {/* SCHEDE NUMERICHE */}
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <h1>{stat.totaleGiochi}</h1>
              <p className="text-muted mb-0">Giochi totali</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <h1>{stat.oreTotali}</h1>
              <p className="text-muted mb-0">Ore giocate</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <h1>{stat.votoMedio.toFixed(1)}</h1>
              <p className="text-muted mb-0">Voto medio</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* GRAFICO A CIAMBELLA */}
      <Card className="mt-2">
        <Card.Body>
          <h4 className="mb-4">Giochi per stato</h4>
          <p className="text-muted">
            Clicca una fetta per vedere i giochi di quello stato.
          </p>

          {datiFiltrati.length === 0 ? (
            <p className="text-muted">
              Aggiungi qualche gioco per vedere il grafico.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={datiFiltrati}
                  dataKey="valore"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={3}
                  label={(voce) => voce.nome + ": " + voce.valore}
                  onClick={(voce) => setStatoScelto(voce.codice)}
                >
                  {datiFiltrati.map((voce, indice) => (
                    <Cell
                      key={indice}
                      fill={voce.colore}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card.Body>
      </Card>

      {/* LISTA GIOCHI DELLO STATO CLICCATO */}
      {statoScelto && (
        <Card className="mt-4">
          <Card.Body>
            <h4 className="mb-3">
              {nomeStatoScelto} ({giochiFiltrati.length})
            </h4>

            {giochiFiltrati.length === 0 ? (
              <p className="text-muted">Nessun gioco in questo stato.</p>
            ) : (
              <Row>
                {giochiFiltrati.map((voce) => (
                  <Col key={voce.id} md={3} className="mb-3">
                    <Card
                      className="h-100"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/collezione/" + voce.id)}
                    >
                      {voce.gioco.copertina && (
                        <Card.Img
                          variant="top"
                          src={voce.gioco.copertina}
                          style={{ height: "140px", objectFit: "cover" }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title style={{ fontSize: "0.95rem" }}>
                          {voce.gioco.titolo}
                        </Card.Title>
                        {voce.voto !== null && (
                          <Badge bg="warning" text="dark">
                            {voce.voto}/10
                          </Badge>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Statistiche;
