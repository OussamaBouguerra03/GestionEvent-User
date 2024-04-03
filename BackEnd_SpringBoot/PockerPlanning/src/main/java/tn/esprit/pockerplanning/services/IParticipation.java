package tn.esprit.pockerplanning.services;

import tn.esprit.pockerplanning.entities.Participation;

import java.util.List;

public interface IParticipation {
	public Participation addParticipation(Participation p,Long eventId);
 	public Participation updateParticipation(Participation p , Long id );
	public void deleteParticipation(Long id);
	public Participation getParticipation(Long id);
	public List<Participation> getParticipations();
}
