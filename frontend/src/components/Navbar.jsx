import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  Search,
  Controller,
  BarChart,
  BoxArrowRight,
  List,
  ArrowLeft,
} from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import "../layout.css";

function Navbar() {
  const { token, utente, numeroGiochi, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aperta, setAperta] = useState(false);
  const [barreVisibili, setBarreVisibili] = useState(true);
  const [mostraLogout, setMostraLogout] = useState(false);
  const timerScroll = useRef(null);

  useEffect(() => {
    function alloScroll() {
      setBarreVisibili(false);

      if (timerScroll.current) {
        clearTimeout(timerScroll.current);
      }

      timerScroll.current = setTimeout(() => {
        setBarreVisibili(true);
      }, 300);
    }

    window.addEventListener("scroll", alloScroll);

    return () => {
      window.removeEventListener("scroll", alloScroll);
      if (timerScroll.current) {
        clearTimeout(timerScroll.current);
      }
    };
  }, []);

  function faiLogout() {
    setMostraLogout(false);
    setAperta(false);
    logout();
    navigate("/login");
  }

  function chiudi() {
    setAperta(false);
  }

  if (!token) {
    return null;
  }

  return (
    <>
      <button
        className={
          "hamburger" +
          (aperta ? " nascosto" : "") +
          (!barreVisibili ? " scroll-nascosto" : "")
        }
        onClick={() => setAperta(true)}
      >
        <List />
      </button>

      <button
        className={
          "indietro" +
          (aperta ? " nascosto" : "") +
          (!barreVisibili ? " scroll-nascosto" : "")
        }
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
      </button>

      <div
        className={"sidebar-overlay" + (aperta ? " attivo" : "")}
        onClick={() => setAperta(false)}
      ></div>

      <div className={"sidebar" + (aperta ? " aperta" : "")}>
        <div className="sidebar-logo">
          <Controller />
          GameLog
        </div>

        <NavLink
          to="/"
          end
          onClick={chiudi}
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " attivo" : "")
          }
        >
          <House /> Home
        </NavLink>

        <NavLink
          to="/cerca"
          onClick={chiudi}
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " attivo" : "")
          }
        >
          <Search /> Cerca giochi
        </NavLink>

        <NavLink
          to="/collezione"
          onClick={chiudi}
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " attivo" : "")
          }
        >
          <Controller /> La mia collezione
          {numeroGiochi > 0 && (
            <span className="sidebar-badge">{numeroGiochi}</span>
          )}
        </NavLink>

        <NavLink
          to="/statistiche"
          onClick={chiudi}
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " attivo" : "")
          }
        >
          <BarChart /> Statistiche
        </NavLink>

        <div className="sidebar-sezione">Altro</div>

        <button
          className="sidebar-link logout"
          onClick={() => setMostraLogout(true)}
        >
          <BoxArrowRight /> Logout
        </button>

        <div className="sidebar-spazio"></div>

        <div
          className="sidebar-utente"
          style={{ cursor: "pointer" }}
          onClick={() => {
            chiudi();
            navigate("/profilo");
          }}
        >
          {utente && utente.avatar ? (
            <img
              src={utente.avatar}
              alt="avatar"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ) : (
            <div className="sidebar-utente-avatar">
              {utente && utente.nome
                ? utente.nome.charAt(0).toUpperCase()
                : utente && utente.username
                  ? utente.username.charAt(0).toUpperCase()
                  : "?"}
            </div>
          )}
          <div className="sidebar-utente-info">
            <div className="sidebar-utente-nome">
              {utente ? utente.nome || utente.username : "Il mio profilo"}
            </div>
            <div className="sidebar-utente-email">
              {utente ? utente.email : ""}
            </div>
          </div>
        </div>
      </div>

      <Modal show={mostraLogout} onHide={() => setMostraLogout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Esci da GameLog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vuoi davvero uscire dal tuo account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostraLogout(false)}>
            Annulla
          </Button>
          <button
            type="button"
            className="btn-gamelog-danger"
            onClick={faiLogout}
          >
            Esci
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;
