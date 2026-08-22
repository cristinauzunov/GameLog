import { useNavigate } from "react-router-dom";
import "../home.css";

function FilaGiochi({ titolo, giochi }) {
    const navigate = useNavigate();

    if (!giochi || giochi.length === 0) {
        return null;
    }

    return (
        <div className="mb-5">
            {titolo && <h4 className="mb-3">{titolo}</h4>}
            <div className="fila-giochi">
                {giochi.map((gioco) => (
                    <div
                        key={gioco.id}
                        className="fila-card"
                        onClick={() => navigate("/gioco/" + gioco.id)}
                    >
                        {gioco.background_image ? (
                            <img
                                src={gioco.background_image}
                                alt={gioco.name}
                                className="fila-cover"
                            />
                        ) : (
                            <div className="fila-cover fila-cover-vuota">{gioco.name}</div>
                        )}
                        <div className="fila-titolo">{gioco.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilaGiochi;