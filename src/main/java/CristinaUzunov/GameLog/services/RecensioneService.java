package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.RecensioneDTO;
import CristinaUzunov.GameLog.entities.Recensione;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.RecensioneRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecensioneService {

    private final RecensioneRepository recensioneRepository;
    private final SeguitoService seguitoService;

    public RecensioneService(RecensioneRepository recensioneRepository, SeguitoService seguitoService) {
        this.recensioneRepository = recensioneRepository;
        this.seguitoService = seguitoService;
    }

    public List<Recensione> getRecensioniGioco(Long idRawg) {
        return recensioneRepository.findByIdRawg(idRawg);
    }

    public Recensione aggiungi(Utente utente, RecensioneDTO dto) {
        Recensione recensione = new Recensione();
        recensione.setIdRawg(dto.getIdRawg());
        recensione.setTitoloGioco(dto.getTitoloGioco());
        recensione.setTesto(dto.getTesto());
        recensione.setVoto(dto.getVoto());
        recensione.setDataCreazione(LocalDate.now().toString());
        recensione.setUtente(utente);
        return recensioneRepository.save(recensione);
    }

    public Recensione modifica(Utente utente, Long idRecensione, RecensioneDTO dto) {
        Recensione recensione = recensioneRepository.findById(idRecensione)
                .orElseThrow(() -> new RuntimeException("Recensione non trovata"));

        if (!recensione.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi modificare la recensione di un altro utente");
        }

        recensione.setTesto(dto.getTesto());
        recensione.setVoto(dto.getVoto());
        return recensioneRepository.save(recensione);
    }

    public void elimina(Utente utente, Long idRecensione) {
        Recensione recensione = recensioneRepository.findById(idRecensione)
                .orElseThrow(() -> new RuntimeException("Recensione non trovata"));

        if (!recensione.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi eliminare la recensione di un altro utente");
        }

        recensioneRepository.delete(recensione);
    }

    public List<Recensione> getFeed(Utente utente) {
        List<Utente> seguiti = seguitoService.getSeguiti(utente.getId());

        List<Long> idSeguiti = new ArrayList<>();
        for (int i = 0; i < seguiti.size(); i++) {
            idSeguiti.add(seguiti.get(i).getId());
        }

        if (idSeguiti.isEmpty()) {
            return new ArrayList<>();
        }

        return recensioneRepository.findByUtenteIdInOrderByIdDesc(idSeguiti);
    }
}