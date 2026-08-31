package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.entities.Notifica;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.NotificaService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifiche")
public class NotificaController {

    private final NotificaService notificaService;

    public NotificaController(NotificaService notificaService) {
        this.notificaService = notificaService;
    }

    @GetMapping("/mie")
    public List<Notifica> getMie(@AuthenticationPrincipal Utente utente) {
        return notificaService.getMie(utente);
    }

    @PutMapping("/lette")
    public void segnaLette(@AuthenticationPrincipal Utente utente) {
        notificaService.segnaTutteLette(utente);
    }
}