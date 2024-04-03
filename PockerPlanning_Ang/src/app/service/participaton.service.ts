import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Participation } from 'src/app/modules/chef-projet/views/list-participation/list-participation.component';

@Injectable({
  providedIn: 'root'
})
export class ParticipatonService {

  constructor(private httpClient: HttpClient) { }

  public getParticipations(): Observable<Participation[]> {
    return this.httpClient.get<Participation[]>('http://localhost:8980/PockerPlanning/participation/getall')
      .pipe(
        catchError(this.handleError)
      );
  }

  // Autres méthodes du service

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('An error occurred:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Renvoie une observable avec un message d'erreur
    return throwError('Something bad happened; please try again later.');
  }
  addParticipation(participation: Participation, eventId: number) {
    // Écraser la valeur de eventId dans les données de participation
    participation.eventId = eventId;
    // Envoyer les données modifiées au backend
    return this.httpClient.post(`http://localhost:8980/PockerPlanning/participation/add/${eventId}`, participation);
  }
  public deleteParticipation(id: number) {
    return this.httpClient.delete(`http://localhost:8980/PockerPlanning/participation/delete/${id}`);
  }
  public updateParticipation(id: number, a: Participation){
    return this.httpClient.put(`http://localhost:8980/PockerPlanning/participation/update/${id}`,a);
  }
  public retrieveParticipation(id:number){
    return this.httpClient.get<Participation>(`http://localhost:8980/PockerPlanning/participation/getbyid/${id}`)
  }
}
