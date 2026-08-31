package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.entities.Attivita;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.AttivitaService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attivita")
public class AttivitaController {

    private final AttivitaService attivitaService;

    public AttivitaController(AttivitaService attivitaService) {
        this.attivitaService = attivitaService;
    }

    @GetMapping("/feed")
    public List<Attivita> getFeed(@AuthenticationPrincipal Utente utente) {
        return attivitaService.getFeed(utente);
    }
}