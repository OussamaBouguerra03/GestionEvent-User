package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Activity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idActivity;
    private String description;
    private Long hour;
    private String name;
    private Long nbPerson;
    private String picture;

    @ManyToOne
    @JoinColumn(name = "event_id")
    public Evenement event;
}
