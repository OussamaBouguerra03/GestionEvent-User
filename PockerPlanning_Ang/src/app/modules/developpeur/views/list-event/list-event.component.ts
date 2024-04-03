import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { Activity } from '../list-activity/list-activity.component';
import { EventService } from 'src/app/service/event.service';
import { ActivityService } from 'src/app/service/activity.service';
export class Event{
  constructor(
  public idEvent:number,
  public address:string,
  public description:string,
  public eventDate:Date,
  public name:string,
  public nbPlace:number,
  public image:string,
  public price:number,
  public hour: string,
  public  rating:number

  ){}
}
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  event!: Event
  eventList: Event[] = [];
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(public _router: Router, public eventservice: EventService, public activityService: ActivityService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventservice.getEventsPaged(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.eventList = response.content; // Utilisez response.content pour obtenir la liste des événements
        this.totalEvents = response.totalElements;
        this.totalPages = response.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
  }
  showActivities(eventId: number): void {
    // Appelez la méthode du service ActivityService pour récupérer les activités par ID d'événement
    this.activityService.getActivitiesByEventId(eventId)
      .subscribe(
        (activities: Activity[]) => {
          // Traitez les activités récupérées selon vos besoins, par exemple, naviguez vers la liste des activités
          this._router.navigate(['developpeur/list-event', eventId, 'activities']); // Redirigez vers une route dédiée aux activités avec l'ID de l'événement
        },
        (error) => {
          console.error('Erreur lors de la récupération des activités:', error);
          // Affichez un message d'erreur ou effectuez d'autres actions si nécessaire
        }
      );
  }
  showParticipationForm(eventId: number): void {
    const event = this.eventList.find(event => event.idEvent === eventId);
    if (event && event.nbPlace === 0) {
      // Afficher une alerte si le nombre de places est épuisé
      alert("Le nombre de places pour cet événement est complet !");
    } else {
      this._router.navigate(['developpeur/add-participation', eventId]);
    }
  }
  rateEvent(id: number, rating: number): void {
    this.eventservice.updateEventRating(id, rating)
      .subscribe(updatedEvent => {
        // Mettre à jour l'événement dans la liste
        const eventIndex = this.eventList.findIndex(event => event.idEvent === id);
        if (eventIndex !== -1) {
          this.eventList[eventIndex] = updatedEvent;
        }
        // Afficher un message de confirmation ou effectuer d'autres actions si nécessaire
      });
  }
 



  onPageChange(page: number): void {
    this.currentPage = page;
    this.getEvents();
  }
  generateStarRatingArray(rating: number): string[] {
    const starArray: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      starArray.push('fas fa-star');
    }
    if (hasHalfStar) {
      starArray.push('fas fa-star-half-alt');
    }
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      starArray.push('far fa-star');
    }
    return starArray;
  }
  deleteEvent(id: number): void {
    console.log(`delete Event ${id}`);
    this.eventservice.deleteEvent(id).subscribe(
      response => {
        console.log(response);
        // Rafraîchir la liste des événements après la suppression
        this.getEvents();
      },
      error => {
        console.error('Erreur lors de la suppression du fournisseur', error);
      }
    );
    window.location.reload();

  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEvents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getEvents();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEvents();
    }
  }

  addEvent(): void {
    this._router.navigate(['developpeur/add-event'])
  }

  updatevent(id: number): void {
    this._router.navigate(['developpeur/update-event', id])
  }
}
