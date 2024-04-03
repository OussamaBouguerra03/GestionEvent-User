import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { SupplierService } from 'src/app/service/supplier.service';
 
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {
  supplier: any = { eventId: null }; // Initialisation avec eventId à null
  events: any[] = [];

  constructor(private router: Router, private eventService: EventService, private supplierService: SupplierService) {}
  ngOnInit(): void {
    this.eventService.getevents().subscribe(
      (events: any[]) => {
        if (events && events.length > 0) {
          this.events = events;
          console.log('Événements récupérés :', this.events);
        } else {
          console.error('Aucun événement trouvé.');
        }
      },
      error => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );
  }
  
  submitForm() {
    console.log('ID de l\'événement sélectionné :', this.supplier.event);
  
    if (!this.supplier.event) {
      console.error('Aucun événement sélectionné');
      return;
    }
  
    this.supplierService.addSupplier(this.supplier).subscribe(
      (response) => {
        console.log('Fournisseur ajouté avec succès :', response);
        this.router.navigate(['developpeur/list-supplier']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du fournisseur :', error);
      }
    );
  }
  
  
}
