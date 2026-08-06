package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Gioco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GiocoRepository extends JpaRepository<Gioco, Long> {

    Optional<Gioco> findByIdRawg(Long idRawg);
}