package CristinaUzunov.GameLog.dto;

public class RispostaDTO {

    private Long recensioneId;
    private String testo;

    public Long getRecensioneId() {
        return recensioneId;
    }

    public void setRecensioneId(Long recensioneId) {
        this.recensioneId = recensioneId;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }
}