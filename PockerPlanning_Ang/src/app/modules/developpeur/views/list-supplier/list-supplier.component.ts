import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../list-event/list-event.component';
import { EventService } from 'src/app/service/event.service';
import { SupplierService } from 'src/app/service/supplier.service';
 export class Supplier{
  constructor(
    public idSupplier : number, 
    public name:string,
    public numPhone:number,
    public adress:string,
    public dateDelivery: Date,
    public hourDelivery: number,
    public event: Event  
  ){}
}
@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent {
  supplier!: Supplier
  supplierList!: Supplier[]
  constructor(public _router: Router,private eventService: EventService , public supplierservice: SupplierService) { }



  ngOnInit(): void {
    
    this.supplierservice.getsuppliers().subscribe(
      response => {
        console.log('Response from service:', response);
        this.supplierList = response;
      },
      error => {
        console.error('Error from service:', error);
      }
    );
  }
  deleteSupplier(id: number) {
    console.log(`delete Supplier ${id}`);
    this.supplierservice.deleteSupplier(id).subscribe(
      response => {
        console.log(response);
        this.supplierservice.getsuppliers().subscribe(
          response => {
            console.log(response);
            this.supplierList = response;
          },
          error => {
            console.error('Erreur lors de la récupération des fournisseurs après suppression', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la suppression du fournisseur', error);
      }
    );
    window.location.reload();
  }
  
  addSupplier(){
    this._router.navigate(['developpeur/add-supplier'])
  }
  updateSupplier(id: number) {
    
    this._router.navigate(['developpeur/update-supplier', id])
  }
  
}
