import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipatonService } from 'src/app/service/participaton.service';
 
export class Participation{
  constructor(
    public idParticipation: number,
    public lastName: string,
    public firstName:string,
    public number:string,
    public email:string,
    public eventId:number
  ){

  }
}
@Component({
  selector: 'app-list-participation',
  templateUrl: './list-participation.component.html',
  styleUrls: ['./list-participation.component.css']
})
export class ListParticipationComponent {
  participation!: Participation
  participationList!: Participation[]
  participationCount: number = 0;
  eventParticipationCounts: { eventId: number, count: number }[] = [];
  constructor(public _router: Router, public participationservice: ParticipatonService) { }
   chartData: any = {};
  ngOnInit(): void {
 
    this.participationservice.getParticipations().subscribe(
      participations => {
        // Calcul du nombre total de participations
        this.participationCount = participations.length;

        // Calcul de la répartition des participations par événement
        const eventCountsMap = new Map<number, number>();
        participations.forEach(participation => {
          const eventId = participation.eventId;
          if (eventCountsMap.has(eventId)) {
            eventCountsMap.set(eventId, eventCountsMap.get(eventId)! + 1);
          } else {
            eventCountsMap.set(eventId, 1);
          }
        });

        // Convertir la carte en tableau pour l'affichage
        eventCountsMap.forEach((count, eventId) => {
          this.eventParticipationCounts.push({ eventId: eventId, count: count });
        });
      },
      error => {
        console.error('Error while fetching participations:', error);
      }
    );
  
    this.participationservice.getParticipations().subscribe(
      response => {
        console.log('Response from service:', response);
        this.participationList = response;
      },
      error => {
        console.error('Error from service:', error);
      }
    );
  }

 
  
  deleteParticipation(id: number) {
    console.log(`delete Participation ${id}`);
    this.participationservice.deleteParticipation(id).subscribe(
      response => {
        console.log(response);
        this.participationservice.getParticipations().subscribe(
          response => {
            console.log(response);
            this.participationList = response;
          });
      })
     window.location.reload();
  }

  addParticipation(){
    this._router.navigate(['add-participation'])
  }

  updateParticipation(id: number) {
    this._router.navigate(['/update-participation', id])
  }
}
