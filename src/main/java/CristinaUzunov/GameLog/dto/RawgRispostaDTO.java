package CristinaUzunov.GameLog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RawgRispostaDTO {

    private List<RawgGiocoDTO> results;

    public List<RawgGiocoDTO> getResults() {
        return results;
    }

    public void setResults(List<RawgGiocoDTO> results) {
        this.results = results;
    }
}