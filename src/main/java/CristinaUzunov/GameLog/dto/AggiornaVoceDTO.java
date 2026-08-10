package CristinaUzunov.GameLog.dto;

public class AggiornaVoceDTO {

    private String stato;
    private Integer voto;
    private Integer oreGiocate;
    private String note;

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public Integer getVoto() {
        return voto;
    }

    public void setVoto(Integer voto) {
        this.voto = voto;
    }

    public Integer getOreGiocate() {
        return oreGiocate;
    }

    public void setOreGiocate(Integer oreGiocate) {
        this.oreGiocate = oreGiocate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}