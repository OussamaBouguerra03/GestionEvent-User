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
public class commentaire {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long IdCommentaire;
    String contenue;
    @ManyToOne
    @JoinColumn(name="user_id")
    public User user;
    @ManyToOne
    @JoinColumn(name="id_activity")
    public Activity activity;

}
