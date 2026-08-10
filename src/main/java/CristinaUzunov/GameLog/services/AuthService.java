package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.LoginDTO;
import CristinaUzunov.GameLog.dto.RegistrazioneDTO;
import CristinaUzunov.GameLog.entities.Ruolo;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.repositories.UtenteRepository;
import CristinaUzunov.GameLog.security.JwtTools;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTools jwtTools;

    public AuthService(UtenteRepository utenteRepository, PasswordEncoder passwordEncoder, JwtTools jwtTools) {
        this.utenteRepository = utenteRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTools = jwtTools;
    }

    // registrazione di un nuovo utente
    public Utente registra(RegistrazioneDTO dto) {
        if (utenteRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email gia in uso");
        }
        if (utenteRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username gia in uso");
        }

        Utente utente = new Utente();
        utente.setUsername(dto.getUsername());
        utente.setEmail(dto.getEmail());
        utente.setPassword(passwordEncoder.encode(dto.getPassword()));
        utente.setNome(dto.getNome());
        utente.setAvatar(dto.getAvatar());
        utente.setRuolo(Ruolo.USER);

        return utenteRepository.save(utente);
    }

    // login: controlla le credenziali e restituisce il token
    public String login(LoginDTO dto) {
        Utente utente = utenteRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenziali non valide"));

        if (!passwordEncoder.matches(dto.getPassword(), utente.getPassword())) {
            throw new RuntimeException("Credenziali non valide");
        }

        return jwtTools.generaToken(utente);
    }
}