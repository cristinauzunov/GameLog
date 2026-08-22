package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.AggiornaProfiloDTO;
import CristinaUzunov.GameLog.dto.LoginDTO;
import CristinaUzunov.GameLog.dto.LoginResponseDTO;
import CristinaUzunov.GameLog.dto.RegistrazioneDTO;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.AuthService;
import CristinaUzunov.GameLog.services.UtenteService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UtenteService utenteService;

    public AuthController(AuthService authService, UtenteService utenteService) {
        this.authService = authService;
        this.utenteService = utenteService;
    }

    @PostMapping("/register")
    public Utente registra(@RequestBody RegistrazioneDTO dto) {
        return authService.registra(dto);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO dto) {
        String token = authService.login(dto);
        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        return response;
    }

    @GetMapping("/me")
    public Utente getUtenteLoggato(@AuthenticationPrincipal Utente utente) {
        return utente;
    }

    @PutMapping("/me")
    public Utente aggiornaProfilo(@AuthenticationPrincipal Utente utente, @RequestBody AggiornaProfiloDTO dto) {
        return utenteService.aggiornaProfilo(utente, dto);
    }
}