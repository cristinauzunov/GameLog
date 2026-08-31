package CristinaUzunov.GameLog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RawgDettaglioDTO {

    private Long id;
    private String name;
    private String released;
    private String background_image;
    private String description_raw;
    private Integer metacritic;
    private Double rating;

    private List<Genere> genres;
    private List<PiattaformaWrapper> platforms;
    private List<Sviluppatore> developers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReleased() {
        return released;
    }

    public void setReleased(String released) {
        this.released = released;
    }

    public String getBackground_image() {
        return background_image;
    }

    public void setBackground_image(String background_image) {
        this.background_image = background_image;
    }

    public String getDescription_raw() {
        return description_raw;
    }

    public void setDescription_raw(String description_raw) {
        this.description_raw = description_raw;
    }

    public Integer getMetacritic() {
        return metacritic;
    }

    public void setMetacritic(Integer metacritic) {
        this.metacritic = metacritic;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<Genere> getGenres() {
        return genres;
    }

    public void setGenres(List<Genere> genres) {
        this.genres = genres;
    }

    public List<PiattaformaWrapper> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<PiattaformaWrapper> platforms) {
        this.platforms = platforms;
    }

    public List<Sviluppatore> getDevelopers() {
        return developers;
    }

    public void setDevelopers(List<Sviluppatore> developers) {
        this.developers = developers;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Genere {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PiattaformaWrapper {
        private Piattaforma platform;

        public Piattaforma getPlatform() {
            return platform;
        }

        public void setPlatform(Piattaforma platform) {
            this.platform = platform;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Piattaforma {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Sviluppatore {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}