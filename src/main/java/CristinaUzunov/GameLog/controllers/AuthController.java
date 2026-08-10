package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.LoginDTO;
import CristinaUzunov.GameLog.dto.LoginResponseDTO;
import CristinaUzunov.GameLog.dto.RegistrazioneDTO;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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
}