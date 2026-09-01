package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.RispostaDTO;
import CristinaUzunov.GameLog.entities.Risposta;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.RispostaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RispostaService {

    private final RispostaRepository rispostaRepository;

    public RispostaService(RispostaRepository rispostaRepository) {
        this.rispostaRepository = rispostaRepository;
    }

    public List<Risposta> getRisposte(Long recensioneId) {
        return rispostaRepository.findByRecensioneIdOrderByIdAsc(recensioneId);
    }

    public Risposta aggiungi(Utente utente, RispostaDTO dto) {
        Risposta risposta = new Risposta();
        risposta.setRecensioneId(dto.getRecensioneId());
        risposta.setTesto(dto.getTesto());
        risposta.setDataCreazione(LocalDate.now().toString());
        risposta.setUtente(utente);
        return rispostaRepository.save(risposta);
    }

    public void elimina(Utente utente, Long idRisposta) {
        Risposta risposta = rispostaRepository.findById(idRisposta)
                .orElseThrow(() -> new RuntimeException("Risposta non trovata"));

        if (!risposta.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi eliminare la risposta di un altro utente");
        }

        rispostaRepository.delete(risposta);
    }
}