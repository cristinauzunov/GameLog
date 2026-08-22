package CristinaUzunov.GameLog.services;

import CristinaUzunov.GameLog.dto.RawgGiocoDTO;
import CristinaUzunov.GameLog.dto.RawgRispostaDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import CristinaUzunov.GameLog.dto.RawgDettaglioDTO;
import java.util.ArrayList;
import java.util.List;

@Service
public class RawgService {

    @Value("${rawg.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    // cerca i giochi su RAWG a partire dal titolo
    public List<RawgGiocoDTO> cercaGiochi(String titolo) {
        try {
            String titoloCodificato = URLEncoder.encode(titolo, StandardCharsets.UTF_8);
            String url = "https://api.rawg.io/api/games?key=" + apiKey + "&search=" + titoloCodificato;

            RawgRispostaDTO risposta = restTemplate.getForObject(url, RawgRispostaDTO.class);

            if (risposta == null || risposta.getResults() == null) {
                return new ArrayList<>();
            }
            return risposta.getResults();

        } catch (Exception e) {
            System.out.println("Errore RAWG: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    // recupera i dettagli di un singolo gioco (con descrizione)
    public RawgDettaglioDTO getDettaglio(Long id) {
        try {
            String url = "https://api.rawg.io/api/games/" + id + "?key=" + apiKey;
            return restTemplate.getForObject(url, RawgDettaglioDTO.class);
        } catch (Exception e) {
            System.out.println("Errore RAWG dettaglio: " + e.getMessage());
            return null;
        }
    }

    // giochi piu popolari (per la schermata di login, senza autenticazione)
    public List<RawgGiocoDTO> getPopolari() {
        try {
            String url = "https://api.rawg.io/api/games?key=" + apiKey + "&ordering=-added&page_size=40";
            RawgRispostaDTO risposta = restTemplate.getForObject(url, RawgRispostaDTO.class);

            if (risposta == null || risposta.getResults() == null) {
                return new ArrayList<>();
            }
            return risposta.getResults();

        } catch (Exception e) {
            System.out.println("Errore RAWG popolari: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    // nuove uscite: giochi ordinati per data di uscita piu recente
    public List<RawgGiocoDTO> getNuoveUscite() {
        try {
            String url = "https://api.rawg.io/api/games?key=" + apiKey + "&ordering=-released&page_size=12";
            RawgRispostaDTO risposta = restTemplate.getForObject(url, RawgRispostaDTO.class);

            if (risposta == null || risposta.getResults() == null) {
                return new ArrayList<>();
            }
            return risposta.getResults();

        } catch (Exception e) {
            System.out.println("Errore RAWG nuove uscite: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    // giochi di un genere specifico (es. action, role-playing-games)
    public List<RawgGiocoDTO> getPerGenere(String genere) {
        try {
            String url = "https://api.rawg.io/api/games?key=" + apiKey + "&genres=" + genere + "&page_size=40";
            RawgRispostaDTO risposta = restTemplate.getForObject(url, RawgRispostaDTO.class);

            if (risposta == null || risposta.getResults() == null) {
                return new ArrayList<>();
            }
            return risposta.getResults();

        } catch (Exception e) {
            System.out.println("Errore RAWG genere: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}