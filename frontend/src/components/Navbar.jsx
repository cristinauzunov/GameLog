import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../layout.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function faiLogout() {
    logout();
    navigate("/login");
  }

  // se non sei loggata, non mostro la sidebar
  if (!token) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">GameLog</div>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          "sidebar-link" + (isActive ? " attivo" : "")
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/collezione"
        className={({ isActive }) =>
          "sidebar-link" + (isActive ? " attivo" : "")
        }
      >
        La mia collezione
      </NavLink>

      <NavLink
        to="/cerca"
        className={({ isActive }) =>
          "sidebar-link" + (isActive ? " attivo" : "")
        }
      >
        Cerca giochi
      </NavLink>

      <NavLink
        to="/statistiche"
        className={({ isActive }) =>
          "sidebar-link" + (isActive ? " attivo" : "")
        }
      >
        Statistiche
      </NavLink>
      <button
        className="sidebar-link"
        onClick={faiLogout}
        style={{
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
