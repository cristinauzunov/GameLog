package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "notifiche")
public class Notifica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String testo;

    private boolean letta;

    private String dataCreazione;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinatario_id")
    private Utente destinatario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mittente_id")
    private Utente mittente;

    public Notifica() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public boolean isLetta() {
        return letta;
    }

    public void setLetta(boolean letta) {
        this.letta = letta;
    }

    public String getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(String dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public Utente getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(Utente destinatario) {
        this.destinatario = destinatario;
    }

    public Utente getMittente() {
        return mittente;
    }

    public void setMittente(Utente mittente) {
        this.mittente = mittente;
    }
}