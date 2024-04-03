import { Component, OnInit } from '@angular/core';
import { Activity } from '../list-activity/list-activity.component';
 import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { Event } from '../list-event/list-event.component';
  
@Component({
  selector: 'app-activity-event',
  templateUrl: './activity-event.component.html',
  styleUrls: ['./activity-event.component.css']
})
export class ActivityEventComponent implements OnInit {
  activities: Activity[] = [];
  selectedEvent!: Event;
  eventId: number | undefined;

   constructor(private activityService: ActivityService,private route: ActivatedRoute,public _router: Router) { }
   onSelectEvent(event: Event): void {
    this.selectedEvent = event; // Définir selectedEvent sur l'événement sélectionné
  }
  ngOnInit(): void {
    // Récupérer l'ID de l'événement à partir de l'URL
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Assurez-vous que le nom 'id' correspond à celui spécifié dans les routes
      if (this.eventId) {
        // Si l'ID de l'événement est défini, récupérez les activités associées
        this.getActivities();
      } else {
        console.error('Aucun ID d\'événement trouvé dans l\'URL.');
      }
    });
  }
  deleteActivity(id: number) {
    console.log(`delete Activity ${id}`);
    this.activityService.deleteActivity(id).subscribe(
      response => {
        console.log(response);
        this.activityService.getactivities().subscribe(
          response => {
            console.log(response);
            this.activities = response;
          });
      })
      window.location.reload();

  }
  addActivity(){
    this._router.navigate(['developpeur/add-activity'])
  }
  updateActivity(id: number) {
    
    this._router.navigate(['developpeur/update-activity', id])
  }
  getActivities(): void {
    if (!this.eventId) {
      console.error('Aucun ID d\'événement défini.');
      return;
    }

    // Utilisez l'ID de l'événement pour récupérer les activités
    this.activityService.getActivitiesByEventId(this.eventId)
      .subscribe(
        (activities: Activity[]) => {
          this.activities = activities;
        },
        (error) => {
          console.error('Erreur lors de la récupération des activités :', error);
        }
      );
  }
  
}
