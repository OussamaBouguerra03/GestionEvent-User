import { Component } from '@angular/core';

import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-developpeur',
  templateUrl: './list-developpeur.component.html',
  styleUrls: ['./list-developpeur.component.css']
})
export class ListDeveloppeurComponent {
  
  constructor(public userservice: UserService){}

  listdeveloppeur: User[] = [];
  filteredList: User[] = []; // Nouvelle liste filtrée
  searchTerm: string = ''; // Terme de recherche

  ngOnInit() {
    this.getDeveloper();

  }


  getDeveloper(){
    this.userservice.getDeveloper().subscribe((res: any)=>
    {
      this.listdeveloppeur = res;
      this.filteredList = res;
    })
  }

  search(): void {
    // Si aucun terme de recherche n'est saisi, afficher la liste complète
    if (!this.searchTerm.trim()) {
      this.filteredList = this.listdeveloppeur;
      return;
    }

    // Filtrer la liste en fonction du terme de recherche
    this.filteredList = this.listdeveloppeur.filter(user =>
      user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  activateUser(userId: number): void {
    this.userservice.activateUser(userId).subscribe(
      (user) => {
        console.log('Utilisateur activé avec succès', user);
        // Mettez à jour votre interface utilisateur en fonction de la réponse
  
        // Mettez à jour la valeur de isActive pour l'utilisateur dans la liste
        const index = this.listdeveloppeur.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.listdeveloppeur[index].active = true;
        }
      },
      (error) => {
        console.error('Erreur lors de l\'activation de l\'utilisateur', error);
        // Gérez l'erreur et affichez un message à l'utilisateur si nécessaire
      }
    );
  }
  
  deactivateUser(userId: number) {
    this.userservice.deactivateUser(userId).subscribe(
      () => {
        console.log('Utilisateur désactivé avec succès');
        
        // Mettez à jour la valeur de isActive pour l'utilisateur dans la liste
        const index = this.listdeveloppeur.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.listdeveloppeur[index].active = false;
        }
      },
      error => {
        console.error('Erreur lors de la désactivation de l\'utilisateur', error);
      }
    );
  }
  


}
