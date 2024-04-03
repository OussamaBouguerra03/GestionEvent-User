package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Role;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    User findByActivationToken(String token);
    Optional<User> findByPasswordResetToken(String passwordResetToken);
    User findByRole(Role role);
    @Query("SELECT u FROM User u WHERE u.role = 'PROJECTMANAGER' ")
    List<User> findprojectmanager();


    @Query("SELECT u FROM User u WHERE u.role = 'DEVELOPER' ")
    List<User> finddeveloppeur();


    User findByfirstname(String name);
}