package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.AggiornaProfiloDTO;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.UtenteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UtenteService {

    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;

    public UtenteService(UtenteRepository utenteRepository, PasswordEncoder passwordEncoder) {
        this.utenteRepository = utenteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Utente findById(Long id) {
        return utenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato con id: " + id));
    }

    // aggiorna il profilo dell'utente
    public Utente aggiornaProfilo(Utente utente, AggiornaProfiloDTO dto) {

        // aggiorno nome e avatar
        utente.setNome(dto.getNome());
        utente.setAvatar(dto.getAvatar());

        // cambio email solo se e diversa, controllando che non sia gia usata
        if (dto.getEmail() != null && !dto.getEmail().equals(utente.getEmail())) {
            if (utenteRepository.existsByEmail(dto.getEmail())) {
                throw new RuntimeException("Email gia in uso");
            }
            utente.setEmail(dto.getEmail());
        }

        // cambio password solo se ne e stata inserita una nuova
        if (dto.getPasswordNuova() != null && !dto.getPasswordNuova().isEmpty()) {

            // verifico che la password attuale inserita sia corretta
            if (dto.getPasswordAttuale() == null ||
                    !passwordEncoder.matches(dto.getPasswordAttuale(), utente.getPassword())) {
                throw new RuntimeException("La password attuale non e corretta");
            }

            utente.setPassword(passwordEncoder.encode(dto.getPasswordNuova()));
        }

        return utenteRepository.save(utente);
    }
}