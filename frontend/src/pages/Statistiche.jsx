import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../api";
import Spinner8bit from "../components/Spinner8bit";

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
        <Spinner8bit />
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

  const dati = [
    { nome: "Da giocare", codice: "DA_GIOCARE", valore: stat.daGiocare },
    { nome: "In corso", codice: "IN_CORSO", valore: stat.inCorso },
    { nome: "Finito", codice: "FINITO", valore: stat.finito },
    { nome: "Abbandonato", codice: "ABBANDONATO", valore: stat.abbandonato },
  ];

  const totale = stat.totaleGiochi;

  function percentuale(valore) {
    if (totale === 0) {
      return 0;
    }
    return Math.round((valore / totale) * 100);
  }

  const giochiFiltrati = [];
  for (let i = 0; i < voci.length; i++) {
    if (voci[i].stato === statoScelto) {
      giochiFiltrati.push(voci[i]);
    }
  }

  let nomeStatoScelto = "";
  for (let i = 0; i < dati.length; i++) {
    if (dati[i].codice === statoScelto) {
      nomeStatoScelto = dati[i].nome;
    }
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Le mie statistiche</h2>

      <Row>
        <Col md={4} className="mb-4">
          <Card
            className="text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/collezione")}
          >
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

      <Card className="mt-2">
        <Card.Body>
          <h4 className="mb-4">Giochi per stato</h4>
          <p className="text-muted">Clicca uno stato per vedere i giochi.</p>

          {totale === 0 ? (
            <p className="text-muted">
              Aggiungi qualche gioco per vedere le statistiche.
            </p>
          ) : (
            <div>
              {dati.map((d) => (
                <div
                  key={d.codice}
                  className="stat-barra-riga"
                  onClick={() => setStatoScelto(d.codice)}
                >
                  <div className="stat-barra-testo">
                    <span>{d.nome}</span>
                    <span>{d.valore}</span>
                  </div>
                  <div className="stat-barra-sfondo">
                    <div
                      className="stat-barra-riempimento"
                      style={{ width: percentuale(d.valore) + "%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

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
