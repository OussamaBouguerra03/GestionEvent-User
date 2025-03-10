package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.pockerplanning.entities.Evenement;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Repository
public interface EvenementRepository extends JpaRepository<Evenement, Long> {
    @Modifying
    @Query("DELETE FROM Evenement e WHERE e.eventDate = ?1 AND e.hour = ?2")
    void deleteByEventDateAndHour(LocalDate eventDate, LocalTime eventTime);

    List<Evenement> findByEventDateAndHour(LocalDate eventDate, LocalTime eventTime);

 }