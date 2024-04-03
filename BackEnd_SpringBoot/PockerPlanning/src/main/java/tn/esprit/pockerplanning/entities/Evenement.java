package tn.esprit.pockerplanning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Cascade;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
 import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Evenement {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idEvent;
    private String address;
    private String description;
    private Date eventDate; // Utilisez java.sql.Date
    private String name;
    private Long nbPlace;
    private String image;
    private long price;
    private LocalTime hour;
    private double rating;
    private int totalRating; // Somme des évaluations
    private int numberOfRatings; // Nombre total d'évaluations
    private double averageRating; // Rating moyen





}
