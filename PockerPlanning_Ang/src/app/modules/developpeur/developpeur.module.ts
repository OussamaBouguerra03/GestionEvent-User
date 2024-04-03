import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloppeurRoutingModule } from './developpeur-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeveloppeurComponent } from './layout/developpeur/developpeur.component';

import { EditprofilComponent } from './views/editprofil/editprofil.component';
import { AddActivityComponent } from './views/add-activity/add-activity.component';
import { UpdateSupplierComponent } from './views/update-supplier/update-supplier.component';
import { AddEventComponent } from './views/add-event/add-event.component';
import { AddSupplierComponent } from './views/add-supplier/add-supplier.component';
import { ListActivityComponent } from './views/list-activity/list-activity.component';
import { ListEventComponent } from './views/list-event/list-event.component';
import { ListSupplierComponent } from './views/list-supplier/list-supplier.component';
import { UpdateActivityComponent } from './views/update-activity/update-activity.component';
import { UpdateEventComponent } from './views/update-event/update-event.component';
import { ListParticipationComponent } from './views/list-participation/list-participation.component';
import { AddParticipationComponent } from './views/add-participation/add-participation.component';
import { ActivityEventComponent } from './views/activity-event/activity-event.component';



@NgModule({
  declarations: [
    DeveloppeurComponent,
    EditprofilComponent,
    UpdateSupplierComponent,
    UpdateActivityComponent,
    UpdateEventComponent,
    UpdateActivityComponent,
    ListActivityComponent,
    ListEventComponent,
     ListSupplierComponent,
    AddActivityComponent,
    AddEventComponent,
     AddSupplierComponent,
     ListParticipationComponent,
     AddParticipationComponent,
     ActivityEventComponent
     ],
  imports: [
    CommonModule,
    DeveloppeurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DeveloppeurModule { }
