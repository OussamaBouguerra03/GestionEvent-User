package tn.esprit.pockerplanning.services;

import tn.esprit.pockerplanning.entities.Evenement;

import java.util.List;


public interface IEvent {

	public Evenement addEvent(Evenement e);

	public Evenement updateEvent(Evenement e , Long id);
	public void deleteEvent(Long id);
	public Evenement getEvent(Long id );
	public List<Evenement> getEvents();


}
