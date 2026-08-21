package CristinaUzunov.GameLog.controllers;

import CristinaUzunov.GameLog.dto.RawgDettaglioDTO;
import CristinaUzunov.GameLog.dto.RawgGiocoDTO;
import CristinaUzunov.GameLog.services.RawgService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/giochi")
public class GiocoController {

    private final RawgService rawgService;

    public GiocoController(RawgService rawgService) {
        this.rawgService = rawgService;
    }

    // cerca giochi su RAWG per titolo
    @GetMapping("/cerca")
    public List<RawgGiocoDTO> cerca(@RequestParam String titolo) {
        return rawgService.cercaGiochi(titolo);
    }

    // dettagli di un singolo gioco
    @GetMapping("/{id}")
    public RawgDettaglioDTO dettaglio(@PathVariable Long id) {
        return rawgService.getDettaglio(id);
    }

    // giochi popolari (pubblico)
    @GetMapping("/popolari")
    public List<RawgGiocoDTO> popolari() {
        return rawgService.getPopolari();
    }
}