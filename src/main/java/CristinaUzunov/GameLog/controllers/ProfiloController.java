package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.StatisticheDTO;
import CristinaUzunov.GameLog.entities.Recensione;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.entities.VoceCollezione;
import CristinaUzunov.GameLog.repositories.RecensioneRepository;
import CristinaUzunov.GameLog.repositories.VoceCollezioneRepository;
import CristinaUzunov.GameLog.services.CollezioneService;
import CristinaUzunov.GameLog.services.SeguitoService;
import CristinaUzunov.GameLog.services.UtenteService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profilo")
public class ProfiloController {

    private final UtenteService utenteService;
    private final VoceCollezioneRepository voceCollezioneRepository;
    private final RecensioneRepository recensioneRepository;
    private final CollezioneService collezioneService;
    private final SeguitoService seguitoService;

    public ProfiloController(UtenteService utenteService,
                             VoceCollezioneRepository voceCollezioneRepository,
                             RecensioneRepository recensioneRepository,
                             CollezioneService collezioneService,
                             SeguitoService seguitoService) {
        this.utenteService = utenteService;
        this.voceCollezioneRepository = voceCollezioneRepository;
        this.recensioneRepository = recensioneRepository;
        this.collezioneService = collezioneService;
        this.seguitoService = seguitoService;
    }

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable Long id) {
        return utenteService.findById(id);
    }

    @GetMapping("/{id}/collezione")
    public List<VoceCollezione> getCollezione(@PathVariable Long id) {
        return voceCollezioneRepository.findByUtenteId(id);
    }

    @GetMapping("/{id}/recensioni")
    public List<Recensione> getRecensioni(@PathVariable Long id) {
        return recensioneRepository.findByUtenteId(id);
    }

    @GetMapping("/{id}/statistiche")
    public StatisticheDTO getStatistiche(@PathVariable Long id) {
        Utente utente = utenteService.findById(id);
        return collezioneService.getStatistiche(utente);
    }

    @GetMapping("/{id}/seguo")
    public boolean seguo(@AuthenticationPrincipal Utente utente, @PathVariable Long id) {
        return seguitoService.seguo(utente.getId(), id);
    }
}