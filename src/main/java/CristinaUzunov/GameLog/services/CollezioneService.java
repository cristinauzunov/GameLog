package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.AggiornaVoceDTO;
import CristinaUzunov.GameLog.dto.StatisticheDTO;
import CristinaUzunov.GameLog.dto.VoceCollezioneDTO;
import CristinaUzunov.GameLog.entities.Gioco;
import CristinaUzunov.GameLog.entities.StatoGioco;
import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.entities.VoceCollezione;
import CristinaUzunov.GameLog.repositories.GiocoRepository;
import CristinaUzunov.GameLog.repositories.VoceCollezioneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollezioneService {

    private final VoceCollezioneRepository voceCollezioneRepository;
    private final GiocoRepository giocoRepository;
    private final AttivitaService attivitaService;

    public CollezioneService(VoceCollezioneRepository voceCollezioneRepository, GiocoRepository giocoRepository, AttivitaService attivitaService) {
        this.voceCollezioneRepository = voceCollezioneRepository;
        this.giocoRepository = giocoRepository;
        this.attivitaService = attivitaService;
    }

    public VoceCollezione aggiungi(Utente utente, VoceCollezioneDTO dto) {

        Gioco gioco = giocoRepository.findByIdRawg(dto.getIdRawg()).orElse(null);

        if (gioco == null) {
            gioco = new Gioco();
            gioco.setIdRawg(dto.getIdRawg());
            gioco.setTitolo(dto.getTitolo());
            gioco.setPiattaforma(dto.getPiattaforma());
            gioco.setGenere(dto.getGenere());
            gioco.setDataUscita(dto.getDataUscita());
            gioco.setCopertina(dto.getCopertina());
            gioco = giocoRepository.save(gioco);
        }

        VoceCollezione voce = new VoceCollezione();
        voce.setUtente(utente);
        voce.setGioco(gioco);
        voce.setStato(StatoGioco.valueOf(dto.getStato()));
        voce.setVoto(dto.getVoto());
        voce.setOreGiocate(dto.getOreGiocate());
        voce.setNote(dto.getNote());

        VoceCollezione salvata = voceCollezioneRepository.save(voce);

        attivitaService.registra(utente, gioco.getIdRawg(), gioco.getTitolo(), gioco.getCopertina(), "AGGIUNTO");

        return salvata;
    }

    public List<VoceCollezione> getMiaCollezione(Utente utente) {
        return voceCollezioneRepository.findByUtenteId(utente.getId());
    }

    public VoceCollezione aggiorna(Long id, Utente utente, AggiornaVoceDTO dto) {
        VoceCollezione voce = voceCollezioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voce non trovata con id: " + id));

        if (!voce.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi modificare questa voce");
        }

        StatoGioco statoVecchio = voce.getStato();
        StatoGioco statoNuovo = StatoGioco.valueOf(dto.getStato());

        voce.setStato(statoNuovo);
        voce.setVoto(dto.getVoto());
        voce.setOreGiocate(dto.getOreGiocate());
        voce.setNote(dto.getNote());

        VoceCollezione salvata = voceCollezioneRepository.save(voce);

        // registro l'attivita solo se lo stato e cambiato davvero
        if (statoVecchio != statoNuovo) {
            attivitaService.registra(utente, voce.getGioco().getIdRawg(), voce.getGioco().getTitolo(), voce.getGioco().getCopertina(), statoNuovo.toString());
        }

        return salvata;
    }

    public void elimina(Long id, Utente utente) {
        VoceCollezione voce = voceCollezioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voce non trovata con id: " + id));

        if (!voce.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi eliminare questa voce");
        }

        voceCollezioneRepository.delete(voce);
    }

    public StatisticheDTO getStatistiche(Utente utente) {
        List<VoceCollezione> voci = voceCollezioneRepository.findByUtenteId(utente.getId());

        int daGiocare = 0;
        int inCorso = 0;
        int finito = 0;
        int abbandonato = 0;
        int oreTotali = 0;
        int sommaVoti = 0;
        int quantiVoti = 0;

        for (int i = 0; i < voci.size(); i++) {
            VoceCollezione voce = voci.get(i);

            if (voce.getStato() == StatoGioco.DA_GIOCARE) {
                daGiocare++;
            } else if (voce.getStato() == StatoGioco.IN_CORSO) {
                inCorso++;
            } else if (voce.getStato() == StatoGioco.FINITO) {
                finito++;
            } else if (voce.getStato() == StatoGioco.ABBANDONATO) {
                abbandonato++;
            }

            if (voce.getOreGiocate() != null) {
                oreTotali = oreTotali + voce.getOreGiocate();
            }

            if (voce.getVoto() != null) {
                sommaVoti = sommaVoti + voce.getVoto();
                quantiVoti++;
            }
        }

        double votoMedio = 0;
        if (quantiVoti > 0) {
            votoMedio = (double) sommaVoti / quantiVoti;
        }

        StatisticheDTO stat = new StatisticheDTO();
        stat.setTotaleGiochi(voci.size());
        stat.setDaGiocare(daGiocare);
        stat.setInCorso(inCorso);
        stat.setFinito(finito);
        stat.setAbbandonato(abbandonato);
        stat.setOreTotali(oreTotali);
        stat.setVotoMedio(votoMedio);

        return stat;
    }
}