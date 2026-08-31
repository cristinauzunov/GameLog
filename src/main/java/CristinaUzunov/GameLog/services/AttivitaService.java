package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.entities.Attivita;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.AttivitaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttivitaService {

    private final AttivitaRepository attivitaRepository;
    private final SeguitoService seguitoService;

    public AttivitaService(AttivitaRepository attivitaRepository, SeguitoService seguitoService) {
        this.attivitaRepository = attivitaRepository;
        this.seguitoService = seguitoService;
    }

    public void registra(Utente utente, Long idRawg, String titoloGioco, String copertina, String tipo) {
        Attivita attivita = new Attivita();
        attivita.setUtente(utente);
        attivita.setIdRawg(idRawg);
        attivita.setTitoloGioco(titoloGioco);
        attivita.setCopertina(copertina);
        attivita.setTipo(tipo);
        attivita.setDataCreazione(LocalDate.now().toString());
        attivitaRepository.save(attivita);
    }

    public List<Attivita> getFeed(Utente utente) {
        List<Utente> seguiti = seguitoService.getSeguiti(utente.getId());

        List<Long> idSeguiti = new ArrayList<>();
        for (int i = 0; i < seguiti.size(); i++) {
            idSeguiti.add(seguiti.get(i).getId());
        }

        if (idSeguiti.isEmpty()) {
            return new ArrayList<>();
        }

        return attivitaRepository.findByUtenteIdInOrderByIdDesc(idSeguiti);
    }
}