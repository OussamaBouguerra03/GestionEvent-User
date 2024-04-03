package tn.esprit.pockerplanning.services;


import tn.esprit.pockerplanning.entities.Activity;

import java.util.List;

public interface IActivity {
	public Activity addActivity(Activity a);
	public Activity updateActivity(Activity a , Long id );
	public void deleteActivity(Long id);
	public Activity getActivity(Long id);
	public List<Activity> getActivities();
	

}
