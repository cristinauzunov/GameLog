package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.SeguitoService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seguiti")
public class SeguitoController {

    private final SeguitoService seguitoService;

    public SeguitoController(SeguitoService seguitoService) {
        this.seguitoService = seguitoService;
    }

    @PostMapping("/{idSeguito}")
    public void segui(@AuthenticationPrincipal Utente utente, @PathVariable Long idSeguito) {
        seguitoService.segui(utente, idSeguito);
    }

    @DeleteMapping("/{idSeguito}")
    public void smettiDiSeguire(@AuthenticationPrincipal Utente utente, @PathVariable Long idSeguito) {
        seguitoService.smettiDiSeguire(utente, idSeguito);
    }

    @GetMapping("/miei")
    public List<Utente> getMieiSeguiti(@AuthenticationPrincipal Utente utente) {
        return seguitoService.getSeguiti(utente.getId());
    }

    @GetMapping("/follower")
    public List<Utente> getMieiFollower(@AuthenticationPrincipal Utente utente) {
        return seguitoService.getFollower(utente.getId());
    }

    @GetMapping("/utenti")
    public List<Utente> getTuttiGliUtenti(@AuthenticationPrincipal Utente utente) {
        return seguitoService.getTuttiTranneMe(utente.getId());
    }
}