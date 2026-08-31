package CristinaUzunov.GameLog.dto;

public class RecensioneDTO {

    private Long idRawg;
    private String titoloGioco;
    private String testo;
    private Integer voto;

    public Long getIdRawg() {
        return idRawg;
    }

    public void setIdRawg(Long idRawg) {
        this.idRawg = idRawg;
    }

    public String getTitoloGioco() {
        return titoloGioco;
    }

    public void setTitoloGioco(String titoloGioco) {
        this.titoloGioco = titoloGioco;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public Integer getVoto() {
        return voto;
    }

    public void setVoto(Integer voto) {
        this.voto = voto;
    }
}