import { useState, useEffect } from "react";
import api from "../api";
import "../auth.css";

function SfondoGiochi() {
    const [giochi, setGiochi] = useState([]);

    useEffect(() => {
        async function caricaPopolari() {
            try {
                const risposta = await api.get("/giochi/popolari");
                setGiochi(risposta.data);
            } catch {
                setGiochi([]);
            }
        }
        caricaPopolari();
    }, []);

    // duplico la lista per far sembrare lo scorrimento infinito
    const giochiDoppi = giochi.concat(giochi);

    return (
        <div className="auth-sfondo">
            <div className="auth-scroll">
                {giochiDoppi.map((gioco, indice) =>
                    gioco.background_image ? (
                        <img
                            key={indice}
                            src={gioco.background_image}
                            alt={gioco.name}
                            className="auth-cover"
                        />
                    ) : null
                )}
            </div>
        </div>
    );
}

export default SfondoGiochi;