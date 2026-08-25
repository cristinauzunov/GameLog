import { createContext, useState, useEffect } from "react";
import api from "../api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [utente, setUtente] = useState(null);
  const [numeroGiochi, setNumeroGiochi] = useState(0);

  useEffect(() => {
    async function caricaUtente() {
      if (token) {
        try {
          const risposta = await api.get("/auth/me");
          setUtente(risposta.data);
        } catch {
          setUtente(null);
        }
      } else {
        setUtente(null);
      }
    }
    caricaUtente();
  }, [token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    caricaNumeroGiochi();
  }, [token]);

  async function caricaNumeroGiochi() {
    if (token) {
      try {
        const risposta = await api.get("/collezione/mia");
        setNumeroGiochi(risposta.data.length);
      } catch {
        setNumeroGiochi(0);
      }
    } else {
      setNumeroGiochi(0);
    }
  }

  function login(nuovoToken) {
    localStorage.setItem("token", nuovoToken);
    setToken(nuovoToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUtente(null);
    setNumeroGiochi(0);
  }

  function aggiornaUtente(datiUtente) {
    setUtente(datiUtente);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        utente,
        numeroGiochi,
        login,
        logout,
        aggiornaUtente,
        caricaNumeroGiochi,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}