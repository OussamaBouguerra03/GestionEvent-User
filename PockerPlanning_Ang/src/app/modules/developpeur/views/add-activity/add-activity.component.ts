import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EventService } from 'src/app/service/event.service';
 

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  activity: any = {};
  events: any[] = [];
    amPmOptions: number[] = [
    0, 1, 2, 3, 4, 5, 
    6, 7, 8, 9, 10, 11, 
    12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23
];

  constructor(private router: Router,private eventService: EventService ,private activityService: ActivityService) {}

  ngOnInit(): void {
    this.eventService.getevents().subscribe(
      (events: any[]) => {
        this.events = events;
      },
      error => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );
  }

   

  submitForm() {
    this.activityService.addActivity(this.activity).subscribe(
      (response) => {
        console.log('Activité ajoutée avec succès :', response);
        this.router.navigate(['developpeur/list-activity']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'activité :', error);
      }
    );
  }
  onEventSelectionChange(event: any) {
    if (event && event.target && event.target.value) {
        console.log('Événement sélectionné :', event.target.value);
        // Assigner la valeur sélectionnée à l'attribut event de l'activité
        this.activity.event = event.target.value;
    } else {
        console.error('La valeur de l\'événement est null ou undefined.');
    }
}

}
