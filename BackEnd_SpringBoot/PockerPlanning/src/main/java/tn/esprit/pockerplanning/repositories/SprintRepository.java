package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
}