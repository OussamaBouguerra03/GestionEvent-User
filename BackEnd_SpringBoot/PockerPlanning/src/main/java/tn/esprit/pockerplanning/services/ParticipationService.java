package tn.esprit.pockerplanning.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.entities.Evenement;
import tn.esprit.pockerplanning.entities.Participation;
import tn.esprit.pockerplanning.repositories.EvenementRepository;
import tn.esprit.pockerplanning.repositories.ParticipationRepository;

import java.util.List;
import java.util.Optional;


@Service
public class ParticipationService implements IParticipation{

	@Autowired
	ParticipationRepository prepo;

	@Autowired
	EvenementRepository erepo;

	@Override
	public Participation addParticipation(Participation p, Long eventId) {
 		Optional<Evenement> eventOptional = erepo.findById(eventId);
		if (eventOptional.isPresent()) {
 			Evenement event = eventOptional.get();
			p.setEvent(event);
			event.setNbPlace(event.getNbPlace() - 1);
			erepo.save(event);
			return prepo.save(p);
		} else {
return null; 		}
	}


	@Override
	public Participation updateParticipation(Participation p, Long id) {
		// TODO Auto-generated method stub
		Participation pp= prepo.findById(id).get();
		pp.setEmail(p.getEmail());
		pp.setLastName(p.getLastName());
		pp.setNumber(p.getNumber());
		pp.setFirstName(p.getFirstName());
		return prepo.save(pp);
	}

	@Override
	public void deleteParticipation(Long id) {
		// TODO Auto-generated method stub
		prepo.deleteById(id);
		
	}

	@Override
	public Participation getParticipation(Long id) {
		// TODO Auto-generated method stub
		return prepo.findById(id).get();
	}

	@Override
	public List<Participation> getParticipations() {
		// TODO Auto-generated method stub
		return prepo.findAll();
	}

}
