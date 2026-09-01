package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Recensione;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecensioneRepository extends JpaRepository<Recensione, Long> {

    List<Recensione> findByIdRawg(Long idRawg);

    List<Recensione> findByUtenteIdInOrderByIdDesc(List<Long> idUtenti);

    List<Recensione> findByUtenteId(Long utenteId);
}