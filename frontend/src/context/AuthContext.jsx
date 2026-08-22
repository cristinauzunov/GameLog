import { createContext, useState, useEffect } from "react";
import api from "../api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [utente, setUtente] = useState(null);

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

    function login(nuovoToken) {
        localStorage.setItem("token", nuovoToken);
        setToken(nuovoToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUtente(null);
    }

    function aggiornaUtente(datiUtente) {
        setUtente(datiUtente);
    }

    return (
        <AuthContext.Provider value={{ token, utente, login, logout, aggiornaUtente }}>
            {children}
        </AuthContext.Provider>
    );
}