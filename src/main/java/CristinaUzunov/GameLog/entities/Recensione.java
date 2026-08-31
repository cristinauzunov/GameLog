package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "recensioni")
public class Recensione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idRawg;

    private String titoloGioco;

    @Column(columnDefinition = "TEXT")
    private String testo;

    private Integer voto;

    private String dataCreazione;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utente_id")
    private Utente utente;

    public Recensione() {
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

    public String getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(String dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }
}