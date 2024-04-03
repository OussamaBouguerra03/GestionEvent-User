package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Participation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idParticipation;
    private String lastName;
    private String firstName;
    private String number;
    private String email;


    @ManyToOne
    @JoinColumn(name = "event_id") // Assurez-vous que le nom de la colonne correspond à votre base de données
    private Evenement event;

    // Autres méthodes et constructeurs

    public void setEvent(Evenement event) {
        this.event = event;
    }
    @ManyToOne
    User user;


}
