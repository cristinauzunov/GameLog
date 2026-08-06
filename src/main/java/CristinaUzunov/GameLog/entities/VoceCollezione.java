package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "voci_collezione")
public class VoceCollezione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "gioco_id", nullable = false)
    private Gioco gioco;

    @Enumerated(EnumType.STRING)
    private StatoGioco stato;

    private Integer voto;

    private Integer oreGiocate;

    private String note;

    public VoceCollezione() {
    }

    public VoceCollezione(Utente utente, Gioco gioco, StatoGioco stato, Integer voto, Integer oreGiocate, String note) {
        this.utente = utente;
        this.gioco = gioco;
        this.stato = stato;
        this.voto = voto;
        this.oreGiocate = oreGiocate;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public Gioco getGioco() {
        return gioco;
    }

    public void setGioco(Gioco gioco) {
        this.gioco = gioco;
    }

    public StatoGioco getStato() {
        return stato;
    }

    public void setStato(StatoGioco stato) {
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