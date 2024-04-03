package tn.esprit.pockerplanning.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pockerplanning.entities.Activity;
import tn.esprit.pockerplanning.entities.Evenement;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.commentaire;
import tn.esprit.pockerplanning.repositories.ActivityRepository;
import tn.esprit.pockerplanning.repositories.CommentaireRepository;
import tn.esprit.pockerplanning.repositories.UserRepository;
import tn.esprit.pockerplanning.services.ActivityService;
import tn.esprit.pockerplanning.services.IUserServicesImp;

import java.security.Principal;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/activity")
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

	@Autowired
	ActivityService sact;
	@Autowired
	ActivityRepository actrepo;
    @Autowired
	CommentaireRepository commentaireRepository;
    @Autowired
	UserRepository iUserServicesImp;
 
	@PostMapping("/add")
	public Activity addActivity(@RequestBody Activity a) {
		String picture = a.getPicture();

		a.setPicture(picture.substring(12));
		return sact.addActivity(a);
	}
	@PostMapping("/addcommentaire")
	public commentaire addcommentaire(@RequestBody commentaire c, Principal principal) {
		// Vérifier si l'utilisateur est authentifié
		if (principal != null) {
			// Obtenir le nom d'utilisateur à partir de Principal
			String username = principal.getName();

			// Rechercher l'utilisateur dans votre service utilisateur en utilisant le nom d'utilisateur
			Optional<User> optionalUser = iUserServicesImp.findByEmail(username);

			// Vérifier si l'utilisateur existe
			if (optionalUser.isPresent()) {
				// Extraire l'utilisateur de l'Optional
				User user = optionalUser.get();

				// Associer le commentaire à l'utilisateur trouvé
				c.setUser(user);

				// Enregistrer le commentaire dans la base de données
				return commentaireRepository.save(c);
			} else {
				// Gérer le cas où aucun utilisateur correspondant n'est trouvé
				throw new RuntimeException("User not found for username: " + username);
			}
		} else {
			// Gérer le cas où l'utilisateur n'est pas authentifié
			throw new RuntimeException("User not authenticated");
		}
	}


	@GetMapping("/getcomment/{activityId}")
	public List<commentaire> getActivityComments(@PathVariable("activityId") Long activityId) {
		Activity activity = actrepo.findById(activityId)
				.orElseThrow(() -> new IllegalArgumentException("Activité non trouvée avec l'ID : " + activityId));
		return commentaireRepository.findByActivity(activity);
	}

	@GetMapping("/byEvent/{eventId}")
	public List<Activity> getActivitiesByEventId(@PathVariable("eventId") Long eventId) {
		return actrepo.findActivitiesByEventId(eventId);
	}

	 
	@PutMapping("/update/{id}")
	public Activity updateActivity(@RequestBody Activity a, @PathVariable("id") Long id) {
		return sact.updateActivity(a, id);
	}

 
	@DeleteMapping("/delete/{id}")
	public String deleteActivity(@PathVariable("id") Long id) {
		sact.deleteActivity(id);
		return " this activity was deleted with success";
	}

	 
	@GetMapping("/getbyid/{id}")
	public Activity getActivity(@PathVariable("id") Long id) {
		return sact.getActivity(id);
	}

	 
	@GetMapping("/getall")
	public List<Activity> getActivities() {
		return sact.getActivities();
	}

	 


	@GetMapping("/pagedd")
	public Page<Activity> getEventsPaged(@RequestParam(defaultValue = "1") int page,
										  @RequestParam(defaultValue = "10") int pageSize) {
		return sact.getActs(page, pageSize);
	}

}
