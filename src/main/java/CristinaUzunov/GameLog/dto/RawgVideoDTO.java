package CristinaUzunov.GameLog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RawgVideoDTO {

    private List<Video> results;

    public List<Video> getResults() {
        return results;
    }

    public void setResults(List<Video> results) {
        this.results = results;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Video {
        private String name;
        private Dati data;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Dati getData() {
            return data;
        }

        public void setData(Dati data) {
            this.data = data;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Dati {
        private String max;

        public String getMax() {
            return max;
        }

        public void setMax(String max) {
            this.max = max;
        }
    }
}