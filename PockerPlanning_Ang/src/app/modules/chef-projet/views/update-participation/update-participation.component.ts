import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from '../list-participation/list-participation.component';
import { ParticipatonService } from 'src/app/service/participaton.service';
 
@Component({
  selector: 'app-update-participation',
  templateUrl: './update-participation.component.html',
  styleUrls: ['./update-participation.component.css']
})
export class UpdateParticipationComponent {
  id!: number;
  participation: any = {};

  constructor(private _router: Router,
    public participationservice: ParticipatonService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.participation = new Participation(this.id,'' ,'','','',0);
    if (this.id != -1) {
      this.participationservice.retrieveParticipation(this.id)
        .subscribe(
          data => this.participation = data
        )
    }
   
  }


  updateParticipation() {
    this.participationservice.updateParticipation(this.id, this.participation).subscribe(
      (response) => {
        console.log('Participation mis à jour avec succès :', response);
        this._router.navigate(['/list-participation']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la participation :', error);
      }
    );
  }
}
