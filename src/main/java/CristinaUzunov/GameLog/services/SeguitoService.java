package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.entities.Seguito;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.SeguitoRepository;
import CristinaUzunov.GameLog.repositories.UtenteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeguitoService {

    private final SeguitoRepository seguitoRepository;
    private final UtenteRepository utenteRepository;
    private final NotificaService notificaService;

    public SeguitoService(SeguitoRepository seguitoRepository, UtenteRepository utenteRepository, NotificaService notificaService) {
        this.seguitoRepository = seguitoRepository;
        this.utenteRepository = utenteRepository;
        this.notificaService = notificaService;
    }

    public void segui(Utente seguace, Long idSeguito) {
        if (seguace.getId().equals(idSeguito)) {
            throw new RuntimeException("Non puoi seguire te stesso");
        }

        Seguito esistente = seguitoRepository.findBySeguaceIdAndSeguitoId(seguace.getId(), idSeguito);
        if (esistente != null) {
            return;
        }

        Utente daSeguire = utenteRepository.findById(idSeguito)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        Seguito seguito = new Seguito();
        seguito.setSeguace(seguace);
        seguito.setSeguito(daSeguire);
        seguitoRepository.save(seguito);

        String testo = seguace.getNome() != null ? seguace.getNome() : seguace.getUsername();
        notificaService.crea(daSeguire, seguace, testo + " ha iniziato a seguirti");
    }

    public void smettiDiSeguire(Utente seguace, Long idSeguito) {
        Seguito esistente = seguitoRepository.findBySeguaceIdAndSeguitoId(seguace.getId(), idSeguito);
        if (esistente != null) {
            seguitoRepository.delete(esistente);
        }
    }

    public List<Utente> getSeguiti(Long idUtente) {
        List<Seguito> relazioni = seguitoRepository.findBySeguaceId(idUtente);
        List<Utente> utenti = new ArrayList<>();
        for (int i = 0; i < relazioni.size(); i++) {
            utenti.add(relazioni.get(i).getSeguito());
        }
        return utenti;
    }

    public List<Utente> getFollower(Long idUtente) {
        List<Seguito> relazioni = seguitoRepository.findBySeguitoId(idUtente);
        List<Utente> utenti = new ArrayList<>();
        for (int i = 0; i < relazioni.size(); i++) {
            utenti.add(relazioni.get(i).getSeguace());
        }
        return utenti;
    }

    public List<Utente> getTuttiTranneMe(Long idUtente) {
        List<Utente> tutti = utenteRepository.findAll();
        List<Utente> risultato = new ArrayList<>();
        for (int i = 0; i < tutti.size(); i++) {
            if (!tutti.get(i).getId().equals(idUtente)) {
                risultato.add(tutti.get(i));
            }
        }
        return risultato;
    }

    public boolean seguo(Long idSeguace, Long idSeguito) {
        Seguito esistente = seguitoRepository.findBySeguaceIdAndSeguitoId(idSeguace, idSeguito);
        return esistente != null;
    }
}