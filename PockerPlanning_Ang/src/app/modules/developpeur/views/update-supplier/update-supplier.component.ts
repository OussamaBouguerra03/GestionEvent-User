import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { SupplierService } from 'src/app/service/supplier.service';
import { Supplier } from '../list-supplier/list-supplier.component';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent {
  id!: number;
  supplier: any = {};

  constructor(private _router: Router,
    public supplierservice: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.supplier = new Supplier(this.id,'' ,0,'',new Date,0,this.supplier);
    if (this.id != -1) {
      this.supplierservice.retrieveSupplier(this.id)
        .subscribe(
          data => this.supplier = data
        )
    }
   
  }


  updateSupplier() {
    this.supplierservice.updateSupplier(this.id, this.supplier).subscribe(
      (response) => {
        console.log('Fournisseur mis à jour avec succès :', response);
        this._router.navigate(['developpeur/list-supplier']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du fournisseur :', error);
      }
    );
  }
}
