package tn.esprit.pockerplanning.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.entities.Activity;
import tn.esprit.pockerplanning.entities.Evenement;
import tn.esprit.pockerplanning.repositories.ActivityRepository;

import java.util.List;


@Service
public class ActivityService implements IActivity {
	
	@Autowired
	ActivityRepository actrepo;

	@Override
	public Activity addActivity(Activity a) {
		// TODO Auto-generated method stub
		return actrepo.save(a);
	}
	public Page<Activity> getActs(int page, int pageSize) {
		Pageable pageable = PageRequest.of(page - 1, pageSize);
		return actrepo.findAll(pageable);
	}
	@Override
	public Activity updateActivity(Activity a, Long id) {
		Activity aa= actrepo.findById(id).get();
		aa.setDescription(a.getDescription());
		aa.setHour(a.getHour());
		aa.setNbPerson(a.getNbPerson());
		aa.setName(a.getName());
		aa.setPicture(a.getPicture().substring(12));

		return actrepo.save(aa);
	}

	@Override
	public void deleteActivity(Long id) {
		actrepo.deleteById(id);
		
	}

	@Override
	public Activity getActivity(Long id) {
		// TODO Auto-generated method stub
		return actrepo.findById(id).get();
	}

	@Override
	public List<Activity> getActivities() {
		// TODO Auto-generated method stub
		return actrepo.findAll();
	}


}
