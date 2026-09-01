package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.RispostaDTO;
import CristinaUzunov.GameLog.entities.Risposta;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.RispostaService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/risposte")
public class RispostaController {

    private final RispostaService rispostaService;

    public RispostaController(RispostaService rispostaService) {
        this.rispostaService = rispostaService;
    }

    @GetMapping("/recensione/{recensioneId}")
    public List<Risposta> getRisposte(@PathVariable Long recensioneId) {
        return rispostaService.getRisposte(recensioneId);
    }

    @PostMapping
    public Risposta aggiungi(@AuthenticationPrincipal Utente utente, @RequestBody RispostaDTO dto) {
        return rispostaService.aggiungi(utente, dto);
    }

    @DeleteMapping("/{id}")
    public void elimina(@AuthenticationPrincipal Utente utente, @PathVariable Long id) {
        rispostaService.elimina(utente, id);
    }
}