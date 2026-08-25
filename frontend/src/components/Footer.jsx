import { Controller, Github } from "react-bootstrap-icons";
import "../footer.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Footer() {
    const { token } = useContext(AuthContext);

    if (!token) {
        return null;
    }
  return (
    <footer className="footer">
      <div className="footer-contenuto">
        <div className="footer-colonna footer-brand">
          <div className="footer-logo">
            <Controller /> GameLog
          </div>
          <p className="footer-descrizione">
            La tua libreria personale di videogiochi: tieni traccia di cosa hai
            giocato, cosa stai giocando e cosa vuoi ancora scoprire.
          </p>
        </div>

        <div className="footer-colonna">
          <h6>Naviga</h6>
          <a href="/">Home</a>
          <a href="/cerca">Cerca giochi</a>
          <a href="/collezione">La mia collezione</a>
          <a href="/statistiche">Statistiche</a>
        </div>

        <div className="footer-colonna">
          <h6>Risorse</h6>
          <a href="https://rawg.io" target="_blank" rel="noreferrer">
            API RAWG
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React
          </a>
          <a href="https://spring.io" target="_blank" rel="noreferrer">
            Spring Boot
          </a>
        </div>

        <div className="footer-colonna">
          <h6>Progetto</h6>
          <a
            href="https://github.com/stmw3/GameLog"
            target="_blank"
            rel="noreferrer"
          >
            <Github /> GitHub
          </a>
        </div>
      </div>

      <div className="footer-basso">
        <span>© 2026 GameLog. Progetto capstone.</span>
        <span>Dati dei giochi forniti da RAWG</span>
      </div>
    </footer>
  );
}

export default Footer;
