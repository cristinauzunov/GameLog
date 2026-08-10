package CristinaUzunov.GameLog.dto;

public class VoceCollezioneDTO {

    // dati del gioco (arriveranno da RAWG)
    private Long idRawg;
    private String titolo;
    private String piattaforma;
    private String genere;
    private String dataUscita;
    private String copertina;

    // dati personali della collezione
    private String stato;
    private Integer voto;
    private Integer oreGiocate;
    private String note;

    public Long getIdRawg() {
        return idRawg;
    }

    public void setIdRawg(Long idRawg) {
        this.idRawg = idRawg;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getPiattaforma() {
        return piattaforma;
    }

    public void setPiattaforma(String piattaforma) {
        this.piattaforma = piattaforma;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    public String getDataUscita() {
        return dataUscita;
    }

    public void setDataUscita(String dataUscita) {
        this.dataUscita = dataUscita;
    }

    public String getCopertina() {
        return copertina;
    }

    public void setCopertina(String copertina) {
        this.copertina = copertina;
    }

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