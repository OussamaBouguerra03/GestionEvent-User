import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-chefprojet',
  templateUrl: './list-chefprojet.component.html',
  styleUrls: ['./list-chefprojet.component.css']
})
export class ListChefprojetComponent {

  constructor(public userService: UserService){}

  listChefprojet: User[] = [];
  filteredList: User[] = []; // Nouvelle liste filtrée
  searchTerm: string = ''; // Terme de recherche
  
  ngOnInit() {
    this.getProjectmanager();
  }

  getProjectmanager(){
    this.userService.getProjectmanager().subscribe(
      (res: User[]) => {
        this.listChefprojet = res;
        this.filteredList = res;
        console.log(res);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  search(): void {
    // Si aucun terme de recherche n'est saisi, afficher la liste complète
    if (!this.searchTerm.trim()) {
      this.filteredList = this.listChefprojet;
      return;
    }

    // Filtrer la liste en fonction du terme de recherche
    this.filteredList = this.listChefprojet.filter(user =>
      user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  activateUser(userId: number): void {
    this.userService.activateUser(userId).subscribe(
      () => {
        console.log('Utilisateur activé avec succès');
        // Mettez à jour la liste des utilisateurs pour refléter les derniers changements
        this.getProjectmanager();
      },
      (error) => {
        console.error('Erreur lors de l\'activation de l\'utilisateur', error);
      }
    );
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe(
      () => {
        console.log('Utilisateur désactivé avec succès');
        // Mettez à jour la liste des utilisateurs pour refléter les derniers changements
        this.getProjectmanager();
      },
      (error) => {
        console.error('Erreur lors de la désactivation de l\'utilisateur', error);
      }
    );
  }

}
