import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ListChefprojetComponent } from './views/list-chefprojet/list-chefprojet.component';
import { DeveloppeurComponent } from '../developpeur/layout/developpeur/developpeur.component';
import { ListDeveloppeurComponent } from './views/list-developpeur/list-developpeur.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children:[
    { path: 'list-chefprojet', component: ListChefprojetComponent },
    { path: 'listdeveloppeur', component: ListDeveloppeurComponent }

    
  ] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
