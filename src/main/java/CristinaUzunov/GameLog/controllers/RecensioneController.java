package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.RecensioneDTO;
import CristinaUzunov.GameLog.entities.Recensione;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.RecensioneService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recensioni")
public class RecensioneController {

    private final RecensioneService recensioneService;

    public RecensioneController(RecensioneService recensioneService) {
        this.recensioneService = recensioneService;
    }

    @GetMapping("/gioco/{idRawg}")
    public List<Recensione> getRecensioniGioco(@PathVariable Long idRawg) {
        return recensioneService.getRecensioniGioco(idRawg);
    }

    @GetMapping("/feed")
    public List<Recensione> getFeed(@AuthenticationPrincipal Utente utente) {
        return recensioneService.getFeed(utente);
    }

    @PostMapping
    public Recensione aggiungi(@AuthenticationPrincipal Utente utente, @RequestBody RecensioneDTO dto) {
        return recensioneService.aggiungi(utente, dto);
    }

    @PutMapping("/{id}")
    public Recensione modifica(@AuthenticationPrincipal Utente utente, @PathVariable Long id, @RequestBody RecensioneDTO dto) {
        return recensioneService.modifica(utente, id, dto);
    }

    @DeleteMapping("/{id}")
    public void elimina(@AuthenticationPrincipal Utente utente, @PathVariable Long id) {
        recensioneService.elimina(utente, id);
    }
}