package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.entities.Notifica;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.NotificaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificaService {

    private final NotificaRepository notificaRepository;

    public NotificaService(NotificaRepository notificaRepository) {
        this.notificaRepository = notificaRepository;
    }

    public void crea(Utente destinatario, Utente mittente, String testo) {
        Notifica notifica = new Notifica();
        notifica.setDestinatario(destinatario);
        notifica.setMittente(mittente);
        notifica.setTesto(testo);
        notifica.setLetta(false);
        notifica.setDataCreazione(LocalDate.now().toString());
        notificaRepository.save(notifica);
    }

    public List<Notifica> getMie(Utente utente) {
        return notificaRepository.findByDestinatarioIdOrderByIdDesc(utente.getId());
    }

    public void segnaTutteLette(Utente utente) {
        List<Notifica> notifiche = notificaRepository.findByDestinatarioIdOrderByIdDesc(utente.getId());
        for (int i = 0; i < notifiche.size(); i++) {
            notifiche.get(i).setLetta(true);
        }
        notificaRepository.saveAll(notifiche);
    }
}