import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipatonService } from 'src/app/service/participaton.service';
 
@Component({
  selector: 'app-add-participation',
  templateUrl: './add-participation.component.html',
  styleUrls: ['./add-participation.component.css']
})
export class AddParticipationComponent {
  participation: any = {}; 
  eventId!: number;
  participationForm!: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router, private participationService: ParticipatonService) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.eventId = +params['eventId']; // Récupérer l'ID de l'événement depuis l'URL
        this.participation.eventId = this.eventId; // Assigner la valeur de eventId au champ eventId du formulaire
        console.log('ID de l\'événement récupéré :', this.eventId); // Ajouter ce console.log pour vérifier la valeur

    });
}


submitForm() {
  this.participationService.addParticipation(this.participation, this.eventId).subscribe(
    (response) => {
      console.log('participation ajoutée avec succès :', response);
      this.router.navigate(['/list-participation']);
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de la participation :', error);
    }
  );
}



}
