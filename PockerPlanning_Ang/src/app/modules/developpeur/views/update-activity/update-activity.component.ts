import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Activity } from '../list-activity/list-activity.component';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent {
  id!: number;
  activity: any = {};

  constructor(private _router: Router,
    public activityservice: ActivityService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.activity = new Activity(this.id,'' ,'',0,0,'',this.activity);
    if (this.id != -1) {
      this.activityservice.retrieveActivity(this.id)
        .subscribe(
          data => this.activity = data
        )
    }
   
  }


  updateActivity() {
    this.activityservice.updateActivity(this.id, this.activity).subscribe(
      (response) => {
        console.log('Activité mise à jour avec succès :', response);
        this._router.navigate(['developpeur/list-activity']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'activité :', error);
      }
    );
  }
}