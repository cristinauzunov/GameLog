import { useContext, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";
import "../layout.css";

function Navbar() {
  const { token, utente, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aperta, setAperta] = useState(false);

  function faiLogout() {
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
        className={"hamburger" + (aperta ? " nascosto" : "")}
        onClick={() => setAperta(true)}
      >
        <List />
      </button>

      <button
        className={"indietro" + (aperta ? " nascosto" : "")}
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

        <button className="sidebar-link logout" onClick={faiLogout}>
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
    </>
  );
}

export default Navbar;
