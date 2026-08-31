package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Notifica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificaRepository extends JpaRepository<Notifica, Long> {

    List<Notifica> findByDestinatarioIdOrderByIdDesc(Long destinatarioId);
}