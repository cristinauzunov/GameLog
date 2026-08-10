package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.UtenteRepository;
import org.springframework.stereotype.Service;

@Service
public class UtenteService {

    private final UtenteRepository utenteRepository;

    public UtenteService(UtenteRepository utenteRepository) {
        this.utenteRepository = utenteRepository;
    }

    public Utente findById(Long id) {
        return utenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato con id: " + id));
    }
}