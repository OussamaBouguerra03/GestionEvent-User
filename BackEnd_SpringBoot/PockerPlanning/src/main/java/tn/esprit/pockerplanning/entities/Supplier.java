package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Supplier {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idSupplier;
    private String name;
    private String numPhone;
    private String adress;
    private Date dateDelivery;
    private Long hourDelivery;
     private String email;

    @ManyToOne
    @JoinColumn(name = "event_id")
    public Evenement event;
}
