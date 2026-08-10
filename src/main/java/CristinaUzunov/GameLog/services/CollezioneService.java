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

    public CollezioneService(VoceCollezioneRepository voceCollezioneRepository, GiocoRepository giocoRepository) {
        this.voceCollezioneRepository = voceCollezioneRepository;
        this.giocoRepository = giocoRepository;
    }

    // aggiunge un gioco alla collezione dell'utente
    public VoceCollezione aggiungi(Utente utente, VoceCollezioneDTO dto) {

        // cerco se il gioco esiste gia nel database (per idRawg)
        Gioco gioco = giocoRepository.findByIdRawg(dto.getIdRawg()).orElse(null);

        // se non c'e, lo creo e lo salvo
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

        // creo la voce di collezione collegata all'utente e al gioco
        VoceCollezione voce = new VoceCollezione();
        voce.setUtente(utente);
        voce.setGioco(gioco);
        voce.setStato(StatoGioco.valueOf(dto.getStato()));
        voce.setVoto(dto.getVoto());
        voce.setOreGiocate(dto.getOreGiocate());
        voce.setNote(dto.getNote());

        return voceCollezioneRepository.save(voce);
    }

    // restituisce tutta la collezione dell'utente
    public List<VoceCollezione> getMiaCollezione(Utente utente) {
        return voceCollezioneRepository.findByUtenteId(utente.getId());
    }

    // modifica una voce della collezione (solo se e dell'utente)
    public VoceCollezione aggiorna(Long id, Utente utente, AggiornaVoceDTO dto) {
        VoceCollezione voce = voceCollezioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voce non trovata con id: " + id));

        // controllo che la voce appartenga all'utente loggato
        if (!voce.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi modificare questa voce");
        }

        voce.setStato(StatoGioco.valueOf(dto.getStato()));
        voce.setVoto(dto.getVoto());
        voce.setOreGiocate(dto.getOreGiocate());
        voce.setNote(dto.getNote());

        return voceCollezioneRepository.save(voce);
    }

    // elimina una voce della collezione (solo se e dell'utente)
    public void elimina(Long id, Utente utente) {
        VoceCollezione voce = voceCollezioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voce non trovata con id: " + id));

        if (!voce.getUtente().getId().equals(utente.getId())) {
            throw new RuntimeException("Non puoi eliminare questa voce");
        }

        voceCollezioneRepository.delete(voce);
    }

    // calcola le statistiche della collezione dell'utente
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

            // conto i giochi in base allo stato
            if (voce.getStato() == StatoGioco.DA_GIOCARE) {
                daGiocare++;
            } else if (voce.getStato() == StatoGioco.IN_CORSO) {
                inCorso++;
            } else if (voce.getStato() == StatoGioco.FINITO) {
                finito++;
            } else if (voce.getStato() == StatoGioco.ABBANDONATO) {
                abbandonato++;
            }

            // sommo le ore (se presenti)
            if (voce.getOreGiocate() != null) {
                oreTotali = oreTotali + voce.getOreGiocate();
            }

            // sommo i voti (se presenti) per calcolare la media
            if (voce.getVoto() != null) {
                sommaVoti = sommaVoti + voce.getVoto();
                quantiVoti++;
            }
        }

        // calcolo il voto medio, evitando la divisione per zero
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