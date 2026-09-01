package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Risposta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RispostaRepository extends JpaRepository<Risposta, Long> {

    List<Risposta> findByRecensioneIdOrderByIdAsc(Long recensioneId);
}