package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "attivita")
public class Attivita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idRawg;

    private String titoloGioco;

    private String copertina;

    private String tipo;

    private String dataCreazione;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utente_id")
    private Utente utente;

    public Attivita() {
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

    public String getCopertina() {
        return copertina;
    }

    public void setCopertina(String copertina) {
        this.copertina = copertina;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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