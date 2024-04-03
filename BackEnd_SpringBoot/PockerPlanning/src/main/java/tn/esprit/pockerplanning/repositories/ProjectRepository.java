package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}