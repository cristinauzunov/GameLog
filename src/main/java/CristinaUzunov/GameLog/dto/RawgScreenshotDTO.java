package CristinaUzunov.GameLog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RawgScreenshotDTO {

    private List<Screenshot> results;

    public List<Screenshot> getResults() {
        return results;
    }

    public void setResults(List<Screenshot> results) {
        this.results = results;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Screenshot {
        private String image;

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }
}