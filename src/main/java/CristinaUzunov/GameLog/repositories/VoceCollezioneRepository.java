package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.VoceCollezione;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoceCollezioneRepository extends JpaRepository<VoceCollezione, Long> {

    List<VoceCollezione> findByUtenteId(Long utenteId);
}