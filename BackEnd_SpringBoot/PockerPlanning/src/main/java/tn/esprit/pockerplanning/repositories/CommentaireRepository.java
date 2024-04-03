package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pockerplanning.entities.Activity;
import tn.esprit.pockerplanning.entities.commentaire;

import java.util.List;

@Repository
public interface CommentaireRepository extends JpaRepository< commentaire,Long> {
    List<commentaire> findByActivity(Activity activity);
}
