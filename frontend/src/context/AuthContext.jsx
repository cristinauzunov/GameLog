import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    // leggo il token salvato nel browser (se c'e gia)
    const [token, setToken] = useState(localStorage.getItem("token"));

    // salva il token dopo il login
    function login(nuovoToken) {
        localStorage.setItem("token", nuovoToken);
        setToken(nuovoToken);
    }

    // cancella il token al logout
    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}