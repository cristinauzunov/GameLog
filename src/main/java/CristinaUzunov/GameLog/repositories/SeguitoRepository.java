package CristinaUzunov.GameLog.repositories;

import CristinaUzunov.GameLog.entities.Seguito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeguitoRepository extends JpaRepository<Seguito, Long> {

    List<Seguito> findBySeguaceId(Long seguaceId);

    List<Seguito> findBySeguitoId(Long seguitoId);

    Seguito findBySeguaceIdAndSeguitoId(Long seguaceId, Long seguitoId);
}