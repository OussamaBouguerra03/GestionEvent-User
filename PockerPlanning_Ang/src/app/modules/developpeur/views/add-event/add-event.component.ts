import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { EventService } from 'src/app/service/event.service';
 
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  event: any = {}; 
  amPmOptions: number[] = [
    0, 1, 2, 3, 4, 5, 
    6, 7, 8, 9, 10, 11, 
    12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23
];


   constructor(private router: Router, private eventService: EventService) {}
   showPDF(event: any) {
    const doc = new jsPDF();
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/background.jpg'; // Chemin vers votre image
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const content = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; background: linear-gradient(to bottom, #ffffff, #dcdcdc);">
      <h1 style="color: #007bff; font-size: 24px;">${event.name}</h1>
      <hr style="border: none; border-top: 1px solid #007bff; margin: 10px auto; width: 50%;">
      <div style="margin-bottom: 20px; text-align: left; display: flex; justify-content: space-between;">
        <div><strong style="color: #007bff; font-size: 8px;">Adresse:.. </strong></div>
        <div><span style="color: #555; font-size: 6px;">${event.address}</span></div>
      </div>
      <div style="margin-bottom: 20px; text-align: left; display: flex; justify-content: space-between;">
        <div><strong style="color: #007bff; font-size: 8px;">Description:.. </strong></div>
        <div><span style="color: #555; font-size: 6px;">${event.description}</span></div>
      </div>
      <div style="margin-bottom: 20px; text-align: left; display: flex; justify-content: space-between;">
        <div><strong style="color: #007bff; font-size: 8px;">Date de l'événement: </strong>
        <span style="color: #555; font-size: 6px;">${event.eventDate}</span></div>
      </div>
         <div><strong style="color: #007bff; font-size: 8px;">Nombre de places: </strong></div>
        <div><span style="color: #555; font-size: 6px;">${event.nbPlace}</span></div>
       <div style="margin-bottom: 20px; text-align: left; display: flex; justify-content: space-between;">
        <div><strong style="color: #007bff; font-size: 8px;">Prix:.. </strong></div>
        <div><span style="color: #555; font-size: 6px;">${event.price}</span></div>
      </div>
         <div><strong style="color: #007bff; font-size: 8px;">Heure de l'événement:.. </strong></div>
        <div><span style="color: #555; font-size: 6px;">${event.hour} ${event.hour >= 12 ? 'PM' : 'AM'}</span></div>
       <hr style="border: none; border-top: 1px solid #007bff; margin: 20px auto; width: 50%;">
     </div>
    `;
    doc.html(content, {
      callback: (doc) => {
        doc.save(event.name + '.pdf');
      },
      html2canvas: { scale: 0.47 },
      x: 10,
      y: 50,
      width: doc.internal.pageSize.getWidth(),
    });
  }

  listEvent() {
    this.router.navigate(['developpeur/list-event']);
  }

  submitForm() {
    this.eventService.addEvent(this.event).subscribe(
      (response) => {
        console.log('evenement ajoutée avec succès :', response);
this.showPDF(this.event);
this.listEvent();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout :', error);
      }
    );
  }
}
