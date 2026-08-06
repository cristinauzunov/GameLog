package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "giochi")
public class Gioco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idRawg;

    @Column(nullable = false)
    private String titolo;

    private String piattaforma;

    private String genere;

    private String dataUscita;

    private String copertina;

    public Gioco() {
    }

    public Gioco(Long idRawg, String titolo, String piattaforma, String genere, String dataUscita, String copertina) {
        this.idRawg = idRawg;
        this.titolo = titolo;
        this.piattaforma = piattaforma;
        this.genere = genere;
        this.dataUscita = dataUscita;
        this.copertina = copertina;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}