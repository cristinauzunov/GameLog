import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RottaProtetta({ children }) {
    const { token } = useContext(AuthContext);

    // se non sei loggata, ti rimando al login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // se sei loggata, mostro la pagina richiesta
    return children;
}

export default RottaProtetta;