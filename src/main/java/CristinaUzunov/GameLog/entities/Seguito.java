package CristinaUzunov.GameLog.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "seguiti")
public class Seguito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seguace_id")
    private Utente seguace;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seguito_id")
    private Utente seguito;

    public Seguito() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utente getSeguace() {
        return seguace;
    }

    public void setSeguace(Utente seguace) {
        this.seguace = seguace;
    }

    public Utente getSeguito() {
        return seguito;
    }

    public void setSeguito(Utente seguito) {
        this.seguito = seguito;
    }
}