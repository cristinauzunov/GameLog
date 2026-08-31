import { useNavigate } from "react-router-dom";
import "../home.css";

function FilaAuto({ titolo, giochi }) {
  const navigate = useNavigate();

  if (!giochi || giochi.length === 0) {
    return null;
  }

  const giochiDoppi = giochi.concat(giochi);

  return (
    <div className="mb-5">
      {titolo && <h4 className="mb-3">{titolo}</h4>}
      <div className="fila-auto">
        <div className="fila-auto-scorri">
          {giochiDoppi.map((gioco, indice) => (
            <div
              key={indice}
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

              <div className="fila-info">
                <div className="fila-info-contenuto">
                  <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {gioco.released ? gioco.released : "Data non disponibile"}
                  </div>
                  <span style={{ color: "#7c3aed", fontSize: "0.85rem" }}>
                    Vedi dettagli ›
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilaAuto;
