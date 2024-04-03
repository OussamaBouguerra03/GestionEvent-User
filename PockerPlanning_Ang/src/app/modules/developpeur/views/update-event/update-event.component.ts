import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Event } from '../list-event/list-event.component';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  id!: number;
  event: any = {};
  amPmOptions: number[] = [
    0, 1, 2, 3, 4, 5, 
    6, 7, 8, 9, 10, 11, 
    12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23
];

  constructor(private _router: Router,
    public eventservice: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.event = new Event(this.id,'','',new Date,'',0,'',0,'',0 );
    if (this.id != -1) {
      this.eventservice.retrieveEvent(this.id)
        .subscribe(
          data => this.event = data
        )
    }
   
  }


  updateEvent() {
    this.eventservice.updateEvent(this.id, this.event).subscribe(
      (response) => {
        console.log('event mis à jour avec succès :', response);
        this._router.navigate(['developpeur/list-event']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour  :', error);
      }
    );
  }
}
