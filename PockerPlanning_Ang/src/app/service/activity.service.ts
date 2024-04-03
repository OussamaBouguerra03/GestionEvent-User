import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Activity } from '../modules/developpeur/views/list-activity/list-activity.component';
import { Event } from '../modules/developpeur/views/list-event/list-event.component';
import { Commentaire } from '../commentaire';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  public getactivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>('http://localhost:8980/PockerPlanning/activity/getall')
      .pipe(
        catchError(this.handleError)
      );
  }
  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:8980/PockerPlanning/event/getall')
      .pipe(
        catchError(this.handleError)
      );
  }
 
  addComment(commentaire: Commentaire) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });

    return this.httpClient.post('http://localhost:8980/PockerPlanning/activity/addcommentaire', commentaire, { headers });
  }
  private baseUrl = 'http://localhost:8980/PockerPlanning';

  getCommentsForActivity(activityId: number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>('http://localhost:8980/PockerPlanning/activity/getcomment/' + activityId);
  }
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
  addActivity(a: Activity) {
    return this.httpClient.post('http://localhost:8980/PockerPlanning/activity/add', a);
  }
  public getActivitiesByEventId(eventId: number): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`http://localhost:8980/PockerPlanning/activity/byEvent/${eventId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  // addUser(user: User, departmentId: number) {
  //   return this.httpClient.post(`http://localhost:8080/PFE/user/addep/${departmentId}`,user);
  // }
  // addUser1(a: User, id:number) {
  //   return this.httpClient.post(`http://localhost:8080/PFE/user/add/${id}`, a);
  // }
  public deleteActivity(id: number) {
    return this.httpClient.delete(`http://localhost:8980/PockerPlanning/activity/delete/${id}`);
  }
  public updateActivity(id: number, a: Activity){
    return this.httpClient.put(`http://localhost:8980/PockerPlanning/activity/update/${id}`,a);
  }
  public retrieveActivity(id:number){
    return this.httpClient.get<Activity>(`http://localhost:8980/PockerPlanning/activity/getbyid/${id}`)
  }
   
  getActsPaged(page: number, pageSize: number): Observable<any> {
    const url = `http://localhost:8980/PockerPlanning/activity/paged?page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getActivities(page: number, pageSize: number): Observable<any> {
    const url = `http://localhost:8980/PockerPlanning/activity?page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  getActs(page: number, pageSize: number): Observable<any> {
    const url = `http://localhost:8980/PockerPlanning/activity?page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url);
}

}
