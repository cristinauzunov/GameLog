package CristinaUzunov.GameLog.dto;

public class StatisticheDTO {

    private int totaleGiochi;
    private int daGiocare;
    private int inCorso;
    private int finito;
    private int abbandonato;
    private int oreTotali;
    private double votoMedio;

    public int getTotaleGiochi() {
        return totaleGiochi;
    }

    public void setTotaleGiochi(int totaleGiochi) {
        this.totaleGiochi = totaleGiochi;
    }

    public int getDaGiocare() {
        return daGiocare;
    }

    public void setDaGiocare(int daGiocare) {
        this.daGiocare = daGiocare;
    }

    public int getInCorso() {
        return inCorso;
    }

    public void setInCorso(int inCorso) {
        this.inCorso = inCorso;
    }

    public int getFinito() {
        return finito;
    }

    public void setFinito(int finito) {
        this.finito = finito;
    }

    public int getAbbandonato() {
        return abbandonato;
    }

    public void setAbbandonato(int abbandonato) {
        this.abbandonato = abbandonato;
    }

    public int getOreTotali() {
        return oreTotali;
    }

    public void setOreTotali(int oreTotali) {
        this.oreTotali = oreTotali;
    }

    public double getVotoMedio() {
        return votoMedio;
    }

    public void setVotoMedio(double votoMedio) {
        this.votoMedio = votoMedio;
    }
}