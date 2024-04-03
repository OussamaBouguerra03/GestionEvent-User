import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './layout/admin/admin.component';
import { ListChefprojetComponent } from './views/list-chefprojet/list-chefprojet.component';
import { ListDeveloppeurComponent } from './views/list-developpeur/list-developpeur.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListChefprojetComponent,
    ListDeveloppeurComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { 
}
