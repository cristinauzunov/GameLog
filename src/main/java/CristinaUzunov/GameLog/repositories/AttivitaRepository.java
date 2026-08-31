package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Attivita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttivitaRepository extends JpaRepository<Attivita, Long> {

    List<Attivita> findByUtenteIdInOrderByIdDesc(List<Long> idUtenti);
}