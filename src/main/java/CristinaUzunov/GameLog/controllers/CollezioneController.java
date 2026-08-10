package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.AggiornaVoceDTO;
import CristinaUzunov.GameLog.dto.StatisticheDTO;
import CristinaUzunov.GameLog.dto.VoceCollezioneDTO;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.entities.VoceCollezione;
import CristinaUzunov.GameLog.services.CollezioneService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collezione")
public class CollezioneController {

    private final CollezioneService collezioneService;

    public CollezioneController(CollezioneService collezioneService) {
        this.collezioneService = collezioneService;
    }

    // aggiunge un gioco alla propria collezione
    @PostMapping
    public VoceCollezione aggiungi(@AuthenticationPrincipal Utente utente, @RequestBody VoceCollezioneDTO dto) {
        return collezioneService.aggiungi(utente, dto);
    }

    // restituisce la propria collezione
    @GetMapping("/mia")
    public List<VoceCollezione> getMiaCollezione(@AuthenticationPrincipal Utente utente) {
        return collezioneService.getMiaCollezione(utente);
    }

    // modifica una voce della propria collezione
    @PutMapping("/{id}")
    public VoceCollezione aggiorna(@PathVariable Long id,
                                   @AuthenticationPrincipal Utente utente,
                                   @RequestBody AggiornaVoceDTO dto) {
        return collezioneService.aggiorna(id, utente, dto);
    }

    // elimina una voce della propria collezione
    @DeleteMapping("/{id}")
    public void elimina(@PathVariable Long id, @AuthenticationPrincipal Utente utente) {
        collezioneService.elimina(id, utente);
    }

    // restituisce le statistiche della propria collezione
    @GetMapping("/statistiche")
    public StatisticheDTO getStatistiche(@AuthenticationPrincipal Utente utente) {
        return collezioneService.getStatistiche(utente);
    }
}