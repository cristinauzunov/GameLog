package CristinaUzunov.GameLog.dto;

public class AggiornaProfiloDTO {

    private String nome;
    private String email;
    private String avatar;
    private String passwordAttuale;
    private String passwordNuova;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPasswordAttuale() {
        return passwordAttuale;
    }

    public void setPasswordAttuale(String passwordAttuale) {
        this.passwordAttuale = passwordAttuale;
    }

    public String getPasswordNuova() {
        return passwordNuova;
    }

    public void setPasswordNuova(String passwordNuova) {
        this.passwordNuova = passwordNuova;
    }
}